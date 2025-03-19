import { Injectable } from '@nestjs/common';
import admin from 'firebase.config';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';

@Injectable()
export class RestaurantService {
  private db = admin.firestore();
  private collectionName = 'restaurants';


  async createRestaurant(restaurant: CreateRestaurantDto): Promise<any> {
    const docRef = this.db.collection(this.collectionName).doc();
    await docRef.set(restaurant);
    return { id: docRef.id, ...restaurant };
  }

  async getRestaurants(): Promise<any[]> {
    const snapshot = await this.db.collection(this.collectionName).get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }

  async getRestaurantById(id: string): Promise<any | null> {
    const doc = await this.db.collection(this.collectionName).doc(id).get();
    return doc.exists ? { id: doc.id, ...doc.data() } : null;
  }

  async deleteRestaurant(id: string): Promise<boolean> {
    await this.db.collection(this.collectionName).doc(id).delete();
    return true;
  }

  async updateRestaurant(id: string, restaurant: UpdateRestaurantDto): Promise<boolean> {
    await this.db.collection(this.collectionName)
      .doc(id)
      .update(restaurant as unknown as FirebaseFirestore.UpdateData<FirebaseFirestore.DocumentData>);
    return true;
  }
}
