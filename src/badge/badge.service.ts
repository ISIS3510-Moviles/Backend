import { Injectable } from '@nestjs/common';
import admin from 'firebase.config';
import { CreateBadgeDto } from './dto/create-badge.dto';
import { UpdateBadgeDto } from './dto/update-badge.dto';

@Injectable()
export class BadgeService {
  private db = admin.firestore();
  private collectionName = 'badges';

  async createBadge(createBadgeDto: CreateBadgeDto): Promise<any> {
    const badgeRef = this.db.collection(this.collectionName).doc();
    const badgeData = { id: badgeRef.id, ...createBadgeDto };
    await badgeRef.set(badgeData);
    return badgeData;
  }

  async getBadges(): Promise<any[]> {
    const snapshot = await this.db.collection(this.collectionName).get();
    return snapshot.docs.map(doc => doc.data());
  }

  async getBadgeById(id: string): Promise<any | null> {
    const doc = await this.db.collection(this.collectionName).doc(id).get();
    return doc.exists ? doc.data() : null;
  }

  async deleteBadge(id: string): Promise<boolean> {
    await this.db.collection(this.collectionName).doc(id).delete();
    return true;
  }

  async updateBadge(id: string, updateBadgeDto: UpdateBadgeDto): Promise<boolean> {
    await this.db
      .collection(this.collectionName)
      .doc(id)
      .update(updateBadgeDto as unknown as FirebaseFirestore.UpdateData<FirebaseFirestore.DocumentData>);
    return true;
  }
}
