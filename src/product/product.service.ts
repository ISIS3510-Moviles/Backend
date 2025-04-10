import { Injectable } from '@nestjs/common';
import admin from 'firebase.config'; // Asegúrate de ajustar la ruta
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

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
    if (nameMatch && nameMatch.trim() !== '') {
      const match = nameMatch.toLowerCase();
      products = products.filter(product =>
        product.name && product.name.toLowerCase().includes(match),
      );
    }
    return products;
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
