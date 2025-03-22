import { Injectable } from '@nestjs/common';
import admin from 'firebase.config';
import { CreateFoodScheduleDto } from './dto/create-food-schedule.dto';
import { UpdateFoodScheduleDto } from './dto/update-food-schedule.dto';

@Injectable()
export class FoodScheduleService {
  private db = admin.firestore();
  private collectionName = 'foodSchedules';

  async createFoodSchedule(createFoodScheduleDto: CreateFoodScheduleDto): Promise<any> {
    const fsRef = this.db.collection(this.collectionName).doc();
    const fsData = { id: fsRef.id, ...createFoodScheduleDto };
    await fsRef.set(fsData);
    return fsData;
  }

  async getFoodSchedules(): Promise<any[]> {
    const snapshot = await this.db.collection(this.collectionName).get();
    return snapshot.docs.map(doc => doc.data());
  }

  async getFoodScheduleById(id: string): Promise<any | null> {
    const doc = await this.db.collection(this.collectionName).doc(id).get();
    return doc.exists ? doc.data() : null;
  }

  async deleteFoodSchedule(id: string): Promise<boolean> {
    await this.db.collection(this.collectionName).doc(id).delete();
    return true;
  }

  async updateFoodSchedule(id: string, updateFoodScheduleDto: UpdateFoodScheduleDto): Promise<boolean> {
    await this.db.collection(this.collectionName).doc(id).update(
      updateFoodScheduleDto as unknown as FirebaseFirestore.UpdateData<FirebaseFirestore.DocumentData>
    );
    return true;
  }
}
