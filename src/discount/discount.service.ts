import { Injectable } from '@nestjs/common';
import admin from 'firebase.config';
import { CreateDiscountDto } from './dto/create-discount.dto';
import { UpdateDiscountDto } from './dto/update-discount.dto';

@Injectable()
export class DiscountService {
  private db = admin.firestore();
  private collectionName = 'discounts';

  async createDiscount(createDiscountDto: CreateDiscountDto): Promise<any> {
    const discountRef = this.db.collection(this.collectionName).doc();
    const discountData = { id: discountRef.id, ...createDiscountDto };
    await discountRef.set(discountData);
    return discountData;
  }

  async getDiscounts(): Promise<any[]> {
    const snapshot = await this.db.collection(this.collectionName).get();
    return snapshot.docs.map(doc => doc.data());
  }

  async getDiscountById(id: string): Promise<any | null> {
    const doc = await this.db.collection(this.collectionName).doc(id).get();
    return doc.exists ? doc.data() : null;
  }

  async deleteDiscount(id: string): Promise<boolean> {
    await this.db.collection(this.collectionName).doc(id).delete();
    return true;
  }

  async updateDiscount(id: string, updateDiscountDto: UpdateDiscountDto): Promise<boolean> {
    await this.db
      .collection(this.collectionName)
      .doc(id)
      .update(updateDiscountDto as unknown as FirebaseFirestore.UpdateData<FirebaseFirestore.DocumentData>);
    return true;
  }
}
