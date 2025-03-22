import { Injectable } from '@nestjs/common';
import admin from 'firebase.config';
import { CreateInstitutionDto } from './dto/create-institution.dto';
import { UpdateInstitutionDto } from './dto/update-institution.dto';

@Injectable()
export class InstitutionService {
  private db = admin.firestore();
  private collectionName = 'institutions';

  async createInstitution(institution: CreateInstitutionDto): Promise<any> {
    const docRef = this.db.collection(this.collectionName).doc();
    await docRef.set(institution);
    return { id: docRef.id, ...institution };
  }

  async getInstitutions(): Promise<any[]> {
    const snapshot = await this.db.collection(this.collectionName).get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }

  async getInstitutionById(id: string): Promise<any | null> {
    const doc = await this.db.collection(this.collectionName).doc(id).get();
    return doc.exists ? { id: doc.id, ...doc.data() } : null;
  }

  async deleteInstitution(id: string): Promise<boolean> {
    await this.db.collection(this.collectionName).doc(id).delete();
    return true;
  }

  async updateInstitution(id: string, institution: UpdateInstitutionDto): Promise<boolean> {
    await this.db
      .collection(this.collectionName)
      .doc(id)
      .update(institution as unknown as FirebaseFirestore.UpdateData<FirebaseFirestore.DocumentData>);
    return true;
  }
}
