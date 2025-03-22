import { Injectable } from '@nestjs/common';
import admin from 'firebase.config';
import { CreateFoodTagDto } from './dto/create-foodTag.dto';
import { UpdateFoodTagDto } from './dto/update-foodTag.dto';

@Injectable()
export class FoodTagService {
  private db = admin.firestore();
  private collectionName = 'foodTags';


  async createFoodTag(foodTag: CreateFoodTagDto): Promise<any> {
    const docRef = this.db.collection(this.collectionName).doc();
    await docRef.set(foodTag);
    return { id: docRef.id, ...foodTag };
  }

  async getFoodTags(): Promise<any[]> {
    const snapshot = await this.db.collection(this.collectionName).get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }

  async getFoodTagById(id: string): Promise<any | null> {
    const doc = await this.db.collection(this.collectionName).doc(id).get();
    return doc.exists ? { id: doc.id, ...doc.data() } : null;
  }

  async deleteFoodTag(id: string): Promise<boolean> {
    await this.db.collection(this.collectionName).doc(id).delete();
    return true;
  }

  async updateFoodTag(id: string, foodTag: UpdateFoodTagDto): Promise<boolean> {
    await this.db
      .collection(this.collectionName)
      .doc(id)
      .update(foodTag as unknown as FirebaseFirestore.UpdateData<FirebaseFirestore.DocumentData>);
    return true;
  }
}
