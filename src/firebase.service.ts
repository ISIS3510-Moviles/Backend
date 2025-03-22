import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';

@Injectable()
export class FirebaseService {
  private db: FirebaseFirestore.Firestore;

  constructor() {
    this.db = admin.firestore();
  }

  async addDocument(collection: string, data: any) {
    const docRef = await this.db.collection(collection).add(data);
    return { id: docRef.id, ...data };
  }

  async getDocuments(collection: string) {
    const snapshot = await this.db.collection(collection).get();
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  }
}
