import { Injectable } from '@nestjs/common';
import admin from 'firebase.config';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';

@Injectable()
export class ReservationService {
  private db = admin.firestore();
  private collectionName = 'reservations';

  

  async createReservation(reservation: CreateReservationDto): Promise<any> {
    const docRef = this.db.collection(this.collectionName).doc(); // Genera un ID automáticamente
    await docRef.set(reservation);
    return { id: docRef.id, ...reservation };
  }

  async getReservations(): Promise<any[]> {
    const snapshot = await this.db.collection(this.collectionName).get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }

  async getReservationById(id: string): Promise<any | null> {
    const doc = await this.db.collection(this.collectionName).doc(id).get();
    return doc.exists ? { id: doc.id, ...doc.data() } : null;
  }

  async deleteReservation(id: string): Promise<boolean> {
    await this.db.collection(this.collectionName).doc(id).delete();
    return true;
  }

  async updateReservation(id: string, reservation: UpdateReservationDto): Promise<boolean> {
    await this.db.collection(this.collectionName).doc(id).update(
      reservation as unknown as FirebaseFirestore.UpdateData<FirebaseFirestore.DocumentData>
    );
    return true;
  }
}
