import { Injectable } from '@nestjs/common';
import admin from 'firebase.config';
import { CreateDietaryTagDto } from './dto/create-dietaryTag.dto';
import { UpdateDietaryTagDto } from './dto/update-dietaryTag.dto';

@Injectable()
export class DietaryTagService {
  private db = admin.firestore();
  private collectionName = 'dietaryTags';

  async createDietaryTag(dietaryTag: CreateDietaryTagDto): Promise<any> {
    const docRef = this.db.collection(this.collectionName).doc();
    await docRef.set(dietaryTag);
    return { id: docRef.id, ...dietaryTag };
  }

  async getDietaryTags(): Promise<any[]> {
    const snapshot = await this.db.collection(this.collectionName).get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }

  async getDietaryTagById(id: string): Promise<any | null> {
    const doc = await this.db.collection(this.collectionName).doc(id).get();
    return doc.exists ? { id: doc.id, ...doc.data() } : null;
  }

  async deleteDietaryTag(id: string): Promise<boolean> {
    await this.db.collection(this.collectionName).doc(id).delete();
    return true;
  }

  async updateDietaryTag(id: string, dietaryTag: UpdateDietaryTagDto): Promise<boolean> {
    await this.db
      .collection(this.collectionName)
      .doc(id)
      .update(dietaryTag as unknown as FirebaseFirestore.UpdateData<FirebaseFirestore.DocumentData>);
    return true;
  }
}
