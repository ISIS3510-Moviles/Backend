import { Injectable } from '@nestjs/common';
import admin from 'firebase.config';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { DocumentSnapshot } from 'firebase-admin/firestore';
import { fetchDocumentsByIds } from 'src/restaurant/restaurant.service';

@Injectable()
export class ProductService {
  private db = admin.firestore();
  private collectionName = 'products';

  async subscribeUser(productId: string, userId: string): Promise<boolean> {
    const productRef = this.db.collection('products').doc(productId);
    const userRef = this.db.collection('users').doc(userId);

    const [productDoc, userDoc] = await Promise.all([
      productRef.get(),
      userRef.get(),
    ]);

    if (!productDoc.exists) {
      throw new Error(`Product with ID ${productId} does not exist.`);
    }

    if (!userDoc.exists) {
      throw new Error(`User with ID ${userId} does not exist.`);
    }

    try {
      const batch = this.db.batch();

      batch.update(userRef, {
        savedProductsIds: admin.firestore.FieldValue.arrayUnion(productId),
      });

      await batch.commit();
      return true;
    } catch (error) {
      console.error(
        'Error subscribing user and updating user document:',
        error,
      );
      throw new Error('Failed to subscribe user to product.');
    }
  }

  async unsubscribeUser(productId: string, userId: string): Promise<boolean> {
    const productRef = this.db.collection('products').doc(productId);
    const userRef = this.db.collection('users').doc(userId);

    const [productDoc, userDoc] = await Promise.all([
      productRef.get(),
      userRef.get(),
    ]);

    if (!productDoc.exists) {
      throw new Error(`Product with ID ${productId} does not exist.`);
    }

    if (!userDoc.exists) {
      throw new Error(`User with ID ${userId} does not exist.`);
    }

    try {
      const batch = this.db.batch();

      batch.update(userRef, {
        savedProductsIds: admin.firestore.FieldValue.arrayRemove(productId),
      });

      await batch.commit();
      return true;
    } catch (error) {
      console.error(
        'Error unsubscribing user and updating user document:',
        error,
      );
      throw new Error('Failed to unsubscribe user from product.');
    }
  }

  async createProduct(product: CreateProductDto): Promise<any> {
    const docRef = this.db.collection(this.collectionName).doc();
    await docRef.set(product);
    return { id: docRef.id, ...product };
  }

  async getProducts(nameMatch?: string): Promise<any[]> {
    const snapshot = await this.db.collection(this.collectionName).get();
    let products = snapshot.docs.map(
      (doc) => ({ id: doc.id, ...doc.data() }) as any,
    );

    if (!nameMatch || nameMatch.trim() === '') {
      return products;
    }

    const match = nameMatch.toLowerCase().trim();

    const initialFilteredProducts = products.filter(
      (product) =>
        (product.name && product.name.toLowerCase().includes(match)) ||
        (product.description &&
          product.description.toLowerCase().includes(match)),
    );

    const allIngredientIds = products.flatMap((p) => p.ingredientsIds || []);
    const allDietaryTagIds = products.flatMap((p) => p.dietaryTagsIds || []);
    const allFoodTagIds = products.flatMap((p) => p.foodTagsIds || []);

    const [ingredientMap, dietaryTagMap, foodTagMap] = await Promise.all([
      fetchDocumentsByIds(this.db, 'ingredients', allIngredientIds),
      fetchDocumentsByIds(this.db, 'dietaryTags', allDietaryTagIds),
      fetchDocumentsByIds(this.db, 'foodTags', allFoodTagIds),
    ]);

    const finalFilteredProducts = products.filter((product) => {
      const nameMatches = product.name?.toLowerCase().includes(match);
      const descriptionMatches = product.description
        ?.toLowerCase()
        .includes(match);

      const ingredientMatches = product.ingredientsIds?.some((id: string) =>
        ingredientMap.get(id)?.name?.toLowerCase().includes(match),
      );

      const dietaryTagMatches = product.dietaryTagsIds?.some((id: string) =>
        dietaryTagMap.get(id)?.name?.toLowerCase().includes(match),
      );

      const foodTagMatches = product.foodTagsIds?.some((id: string) =>
        foodTagMap.get(id)?.name?.toLowerCase().includes(match),
      );

      return (
        nameMatches ||
        descriptionMatches ||
        ingredientMatches ||
        dietaryTagMatches ||
        foodTagMatches
      );
    });

    return finalFilteredProducts;
  }

  async getProductByIdFull(id: string): Promise<any | null> {
    const doc = await this.db.collection(this.collectionName).doc(id).get();
    if (!doc.exists) return null;

    const data = doc.data();
    if (!data) return null;

    const [ingredientsMap, foodTagsMap, dietaryTagsMap] = await Promise.all([
      fetchDocumentsByIds(this.db, 'ingredients', data.ingredientsIds || []),
      fetchDocumentsByIds(this.db, 'foodTags', data.foodTagsIds || []),
      fetchDocumentsByIds(this.db, 'dietaryTags', data.dietaryTagsIds || []),
    ]);

    const ingredients = (data.ingredientsIds || []).map((id: string) =>
      ingredientsMap.get(id),
    );

    const foodTags = (data.foodTagsIds || []).map((id: string) =>
      foodTagsMap.get(id),
    );

    const dietaryTags = (data.dietaryTagsIds || []).map((id: string) =>
      dietaryTagsMap.get(id),
    );

    let restaurant: any = null;

    if (data.restaurant_id) {
      const restaurantDoc = await this.db
        .collection('restaurants')
        .doc(data.restaurant_id)
        .get();

      restaurant = restaurantDoc.exists
        ? { id: restaurantDoc.id, ...restaurantDoc.data() }
        : null;
    }

    return {
      id: doc.id,
      ...data,
      ingredients,
      foodTags,
      dietaryTags,
      restaurant,
    };
  }

  async getProductById(id: string): Promise<any> {
    const doc = await this.db.collection(this.collectionName).doc(id).get();
    return doc.exists ? { id: doc.id, ...doc.data() } : null;
  }

  async deleteProduct(id: string): Promise<boolean> {
    await this.db.collection(this.collectionName).doc(id).delete();
    return true;
  }
  async updateProduct(id: string, product: UpdateProductDto): Promise<boolean> {
    await this.db
      .collection(this.collectionName)
      .doc(id)
      .update(
        product as unknown as FirebaseFirestore.UpdateData<FirebaseFirestore.DocumentData>,
      );
    return true;
  }
  async getProductsByFoodTag(
    tagId: string,
  ): Promise<{ tagName: string | null; products: any[] }> {
    const tagDoc = await this.db.collection('foodTags').doc(tagId).get();
    const tagName = tagDoc.exists ? tagDoc.data()?.name : null;

    const snapshot = await this.db
      .collection(this.collectionName)
      .where('foodTagsIds', 'array-contains', tagId)
      .get();

    const products = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return { tagName, products };
  }
}
