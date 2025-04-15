import { Injectable } from '@nestjs/common';
import admin from 'firebase.config'; // Asegúrate de ajustar la ruta
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { DocumentSnapshot } from 'firebase-admin/firestore';

async function fetchDocumentsByIds(db: FirebaseFirestore.Firestore, collectionName: string, ids: string[]): Promise<Map<string, any>> {
  const uniqueIds = [...new Set(ids)].filter(id => id);
  const docMap = new Map<string, any>();

  if (uniqueIds.length === 0) {
    return docMap;
  }


  const promises: Promise<DocumentSnapshot>[] = uniqueIds.map(id =>
    db.collection(collectionName).doc(id).get()
  );

  try {
    const snapshots = await Promise.all(promises);
    snapshots.forEach(doc => {
      if (doc.exists) {
        docMap.set(doc.id, doc.data());
      } else {
        console.warn(`Document with ID ${doc.id} not found in collection ${collectionName}`);
      }
    });
  } catch (error) {
    console.error(`Error fetching documents from ${collectionName}:`, error);

  }
  return docMap;
}

@Injectable()
export class ProductService {
  private db = admin.firestore();
  private collectionName = 'products';

  async createProduct(product: CreateProductDto): Promise<any> {
    const docRef = this.db.collection(this.collectionName).doc(); // Se genera un ID automáticamente
    await docRef.set(product);
    return { id: docRef.id, ...product };
  }

  async getProducts(nameMatch?: string): Promise<any[]> {
    const snapshot = await this.db.collection(this.collectionName).get();
    let products = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as any));
  
    if (!nameMatch || nameMatch.trim() === '') {
      return products;
    }
  
    const match = nameMatch.toLowerCase().trim();
  
    const initialFilteredProducts = products.filter(product =>
      (product.name && product.name.toLowerCase().includes(match)) ||
      (product.description && product.description.toLowerCase().includes(match))
    );
  
    const allIngredientIds = products.flatMap(p => p.ingredientsIds || []);
    const allDietaryTagIds = products.flatMap(p => p.dietaryTagsIds || []);
    const allFoodTagIds = products.flatMap(p => p.foodTagsIds || []);
  
    const [ingredientMap, dietaryTagMap, foodTagMap] = await Promise.all([
      fetchDocumentsByIds(this.db, 'ingredients', allIngredientIds),
      fetchDocumentsByIds(this.db, 'dietaryTags', allDietaryTagIds),
      fetchDocumentsByIds(this.db, 'foodTags', allFoodTagIds)
    ]);
  
    const finalFilteredProducts = products.filter(product => {
      const nameMatches = product.name?.toLowerCase().includes(match);
      const descriptionMatches = product.description?.toLowerCase().includes(match);
  
      const ingredientMatches = product.ingredientsIds?.some((id: string) =>
        ingredientMap.get(id)?.name?.toLowerCase().includes(match)
      );
  
      const dietaryTagMatches = product.dietaryTagsIds?.some((id: string) =>
        dietaryTagMap.get(id)?.name?.toLowerCase().includes(match)
      );
  
      const foodTagMatches = product.foodTagsIds?.some((id: string) =>
        foodTagMap.get(id)?.name?.toLowerCase().includes(match)
      );
  
      return nameMatches || descriptionMatches || ingredientMatches || dietaryTagMatches || foodTagMatches;
    });
  
    return finalFilteredProducts;
  }
  
  

  async getProductById(id: string): Promise<any | null> {
    const doc = await this.db.collection(this.collectionName).doc(id).get();
    return doc.exists ? { id: doc.id, ...doc.data() } : null;
  }

  async deleteProduct(id: string): Promise<boolean> {
    await this.db.collection(this.collectionName).doc(id).delete();
    return true;
  }
  async updateProduct(id: string, product: UpdateProductDto): Promise<boolean> {
    await this.db.collection(this.collectionName).doc(id).update(
      product as unknown as FirebaseFirestore.UpdateData<FirebaseFirestore.DocumentData>
    );
    return true;
  }
  async getProductsByFoodTag(tagId: string): Promise<{ tagName: string | null; products: any[] }> {
    const tagDoc = await this.db.collection('foodTags').doc(tagId).get();
    const tagName = tagDoc.exists ? tagDoc.data()?.name : null;
  
    const snapshot = await this.db
      .collection(this.collectionName)
      .where('foodTagsIds', 'array-contains', tagId)
      .get();
  
    const products = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  
    return { tagName, products };
  }
}
