import { Injectable } from '@nestjs/common';
import { CreateAlertDto } from './dto/create-alert.dto';
import { UpdateAlertDto } from './dto/update-alert.dto';
import admin from 'firebase.config';
import { fetchDocumentsByIds } from 'src/restaurant/restaurant.service';

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
    return snapshot.docs.map((doc) => doc.data());
  }

async getAlertsFull(): Promise<any[]> {
  const snapshot = await this.db.collection(this.collectionName).get();

  const alerts: any[] = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  const userIds = alerts
    .map((alert) => alert.publisherId)
    .filter((id): id is string => !!id);

  const restaurantIds = alerts
    .map((alert) => alert.restaurantId)
    .filter((id): id is string => !!id);

  const userMap = await fetchDocumentsByIds(this.db, 'users', userIds);
  const restaurantMap = await fetchDocumentsByIds(this.db, 'restaurants', restaurantIds);

  const enrichedAlerts = alerts.map((alert) => ({
    ...alert,
    publisher: userMap.get(alert.publisherId) || null,
    restaurant: restaurantMap.get(alert.restaurantId) || null,
  }));

  return enrichedAlerts;
}

async getAlertsFullByUserId(userId: string): Promise<any[]> {
  const snapshot = await this.db
    .collection(this.collectionName)
    .where('publisherId', '==', userId)
    .get();

  const alerts: any[] = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  const userIds = alerts
    .map((alert) => alert.publisherId)
    .filter((id): id is string => !!id);

  const restaurantIds = alerts
    .map((alert) => alert.restaurantId)
    .filter((id): id is string => !!id);

  const userMap = await fetchDocumentsByIds(this.db, 'users', userIds);
  const restaurantMap = await fetchDocumentsByIds(this.db, 'restaurants', restaurantIds);

  const enrichedAlerts = alerts.map((alert) => ({
    ...alert,
    publisher: userMap.get(alert.publisherId) || null,
    restaurant: restaurantMap.get(alert.restaurantId) || null,
  }));

  return enrichedAlerts;
}

  async getAlertById(id: string): Promise<any | null> {
    const doc = await this.db.collection(this.collectionName).doc(id).get();
    return doc.exists ? doc.data() : null;
  }

  async getAlertByIdFull(id: string): Promise<any | null> {
    const doc = await this.db.collection(this.collectionName).doc(id).get();
    if (!doc.exists) return null;

    const data = doc.data();
    if (!data) return null;

    let publisher: any = null;

    if (data.publisherId) {
      const userDoc = await this.db
        .collection('users')
        .doc(data.publisherId)
        .get();
      publisher = userDoc.exists ? { id: userDoc.id, ...userDoc.data() } : null;
    }

    return {
      id: doc.id,
      ...data,
      publisher,
    };
  }

  async deleteAlert(id: string): Promise<boolean> {
    await this.db.collection(this.collectionName).doc(id).delete();
    return true;
  }

  async updateAlert(id: string, alert: UpdateAlertDto): Promise<boolean> {
    await this.db
      .collection(this.collectionName)
      .doc(id)
      .update(
        alert as unknown as FirebaseFirestore.UpdateData<FirebaseFirestore.DocumentData>,
      );
    return true;
  }
}
