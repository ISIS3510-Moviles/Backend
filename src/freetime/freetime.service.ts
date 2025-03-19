import { Injectable } from '@nestjs/common';
import admin from 'firebase.config';
import { CreateFreeTimeDto } from './dto/create-free-time.dto';

@Injectable()
export class FreeTimeService {
  private db = admin.firestore();
  private collectionName = 'freeTimes';

  async createFreeTime(createFreeTimeDto: CreateFreeTimeDto): Promise<any> {
    const freeTimeRef = this.db.collection(this.collectionName).doc();
    const freeTimeData = { id: freeTimeRef.id, ...createFreeTimeDto };
    await freeTimeRef.set(freeTimeData);
    return freeTimeData;
  }

  async getFreeTimes(): Promise<any[]> {
    const snapshot = await this.db.collection(this.collectionName).get();
    return snapshot.docs.map(doc => doc.data());
  }

  async getFreeTimeById(id: string): Promise<any | null> {
    const doc = await this.db.collection(this.collectionName).doc(id).get();
    return doc.exists ? doc.data() : null;
  }

  async deleteFreeTime(id: string): Promise<boolean> {
    await this.db.collection(this.collectionName).doc(id).delete();
    return true;
  }

  async updateFreeTime(id: string, updateDto: Partial<CreateFreeTimeDto>): Promise<boolean> {
    await this.db.collection(this.collectionName).doc(id).update(
      updateDto as unknown as FirebaseFirestore.UpdateData<FirebaseFirestore.DocumentData>
    );
    return true;
  }
}
