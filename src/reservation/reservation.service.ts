import { Injectable } from '@nestjs/common';
import admin from 'firebase.config';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { fetchDocumentsByIds } from 'src/restaurant/restaurant.service';

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('es-ES', { timeZone: 'UTC' });
}

interface Reservation {
  id: string;
  user_id: string;
  restaurant_id: string;
  [key: string]: any;
}

@Injectable()
export class ReservationService {
  private db = admin.firestore();
  private collectionName = 'reservations';

  async createReservation(reservation: CreateReservationDto): Promise<any> {
    const docRef = this.db.collection(this.collectionName).doc();
    await docRef.set(reservation);

    const restaurantSnap = await this.db
      .collection('restaurants')
      .doc(reservation.restaurant_id)
      .get();
    const restaurantData = restaurantSnap.data();

    const alert = {
      id: docRef.id,
      date: new Date().toISOString(),
      icon: restaurantData?.profilePhoto || '',
      message: `Your reservation has been set up on ${formatDate(reservation.date)} at ${reservation.time}`,
      restaurantId: reservation.restaurant_id,
      votes: 0,
      publisherId: reservation.user_id,
    };

    await this.db.collection('alerts').add(alert);

    return { id: docRef.id, ...reservation };
  }

  async getReservationsByUserId(userId: string): Promise<any[]> {
    const snapshot = await this.db
      .collection(this.collectionName)
      .where('user_id', '==', userId)
      .get();

    const reservations = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Reservation[];

    const restaurantIds = reservations
      .map((r) => r.restaurant_id)
      .filter((id) => !!id);

    const restaurantMap = await fetchDocumentsByIds(
      this.db,
      'restaurants',
      restaurantIds,
    );

    const result = reservations.map((reservation) => ({
      ...reservation,
      restaurant: restaurantMap.get(reservation.restaurant_id) || null,
    }));

    return result;
  }

  async getReservations(): Promise<any[]> {
    const snapshot = await this.db.collection(this.collectionName).get();
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  }

  async getReservationById(id: string): Promise<any | null> {
    const doc = await this.db.collection(this.collectionName).doc(id).get();
    return doc.exists ? { id: doc.id, ...doc.data() } : null;
  }

  async deleteReservation(id: string): Promise<boolean> {
    await this.db.collection(this.collectionName).doc(id).delete();
    return true;
  }

  async updateReservation(
    id: string,
    reservation: UpdateReservationDto,
  ): Promise<boolean> {
    await this.db
      .collection(this.collectionName)
      .doc(id)
      .update(
        reservation as unknown as FirebaseFirestore.UpdateData<FirebaseFirestore.DocumentData>,
      );
    return true;
  }
  async deleteAllReservations(): Promise<boolean> {
    const collectionRef = this.db.collection(this.collectionName);
    let snapshot = await collectionRef.limit(500).get();

    while (!snapshot.empty) {
      const batch = this.db.batch();
      snapshot.docs.forEach((doc) => {
        batch.delete(doc.ref);
      });
      await batch.commit();
      snapshot = await collectionRef.limit(500).get();
    }
    return true;
  }
}
