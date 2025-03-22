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

  async getProducts(): Promise<any[]> {
    const snapshot = await this.db.collection(this.collectionName).get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
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
}
