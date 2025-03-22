import { Injectable } from '@nestjs/common';
import { CreateAlertDto } from './dto/create-alert.dto';
import { UpdateAlertDto } from './dto/update-alert.dto';
import admin from 'firebase.config';

@Injectable()
export class AlertService {
  private collectionName = 'alerts';
  private db = admin.firestore();

  async createAlert(alert: CreateAlertDto): Promise<any> {
    const alertRef = this.db.collection(this.collectionName).doc();
    const alertData = { id: alertRef.id, ...alert };
    await alertRef.set(alertData);
    return alertData;
  }

  async getAlerts(): Promise<any[]> {
    const snapshot = await this.db.collection(this.collectionName).get();
    return snapshot.docs.map(doc => doc.data());
  }

  async getAlertById(id: string): Promise<any | null> {
    const doc = await this.db.collection(this.collectionName).doc(id).get();
    return doc.exists ? doc.data() : null;
  }

  async deleteAlert(id: string): Promise<boolean> {
    await this.db.collection(this.collectionName).doc(id).delete();
    return true;
  }

  async updateAlert(id: string, alert: UpdateAlertDto): Promise<boolean> {
    await this.db
      .collection(this.collectionName)
      .doc(id)
      .update(alert as unknown as FirebaseFirestore.UpdateData<FirebaseFirestore.DocumentData>);
    return true;
  }
}
