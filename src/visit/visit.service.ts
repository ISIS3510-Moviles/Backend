import { Injectable } from '@nestjs/common';
import admin from 'firebase.config';
import { CreateVisitDto } from './dto/create-visit.dto';
import { UpdateVisitDto } from './dto/update-visit.dto';

@Injectable()
export class VisitService {
  private db = admin.firestore();
  
  private collectionName = 'visits';


  async createVisit(visit: CreateVisitDto): Promise<any> {
    const docRef = this.db.collection(this.collectionName).doc(); // Genera un ID automáticamente
    await docRef.set(visit);
    return { id: docRef.id, ...visit };
  }

  async getVisits(): Promise<any[]> {
    const snapshot = await this.db.collection(this.collectionName).get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }

  async getVisitById(id: string): Promise<any | null> {
    const doc = await this.db.collection(this.collectionName).doc(id).get();
    return doc.exists ? { id: doc.id, ...doc.data() } : null;
  }

  async deleteVisit(id: string): Promise<boolean> {
    await this.db.collection(this.collectionName).doc(id).delete();
    return true;
  }

  async updateVisit(id: string, visit: UpdateVisitDto): Promise<boolean> {
    await this.db
      .collection(this.collectionName)
      .doc(id)
      .update(visit as unknown as FirebaseFirestore.UpdateData<FirebaseFirestore.DocumentData>);
    return true;
  }
}
