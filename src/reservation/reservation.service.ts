import { Injectable, NotFoundException } from '@nestjs/common';
import admin from 'firebase.config';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { fetchDocumentsByIds } from 'src/restaurant/restaurant.service';
import { format } from 'date-fns';


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

  async cancelReservation(id: string): Promise<any> {
    try {
      const docRef = this.db.collection(this.collectionName).doc(id);
      const doc = await docRef.get();
  
      if (!doc.exists) {
        throw new NotFoundException(`Reservation with ID ${id} not found`);
      }
  
      const reservationData = doc.data() as FirebaseFirestore.DocumentData;
  
      await docRef.update({
        hasBeenCancelled: true
      });
  
      const restaurantSnap = await this.db
        .collection('restaurants')
        .doc(reservationData.restaurant_id)
        .get();
      const restaurantData = restaurantSnap.data();
  
      const alert = {
        id: docRef.id,
        date: new Date().toISOString(),
        icon: restaurantData?.profilePhoto || '',
        message: `Your reservation for ${format(new Date(reservationData.date), 'PPP')} at ${format(
          new Date(reservationData.date),
          'p'
        )} has been cancelled`,
        restaurantId: reservationData.restaurant_id,
        votes: 0,
        publisherId: reservationData.user_id,
      };
  
      await this.db.collection('alerts').add(alert);
  
      return {
        id,
        ...reservationData,
        hasBeenCancelled: true
      };
    } catch (error) {
      console.error(`Error cancelling reservation: ${error}`);
      throw error;
    }
  }

  async markReservationAsCompleted(id: string): Promise<any> {
  try {
    
    const docRef = this.db.collection(this.collectionName).doc(id);
    const doc = await docRef.get();
    
    if (!doc.exists) {
      throw new NotFoundException(`Reservation with ID ${id} not found`);
    }
    
    const reservationData = doc.data() as FirebaseFirestore.DocumentData;
    
    if (reservationData.hasBeenCancelled) {
      throw new Error(`Cannot complete a cancelled reservation`);
    }
    
    await docRef.update({
      isCompleted: true
    });
    
    const restaurantSnap = await this.db
      .collection('restaurants')
      .doc(reservationData.restaurant_id)
      .get();
    const restaurantData = restaurantSnap.data();
    
    const alert = {
      date: new Date().toISOString(),
      icon: restaurantData?.profilePhoto || '',
      message: `Your reservation for ${format(new Date(reservationData.date), 'PPP')} at ${restaurantData?.name || 'the restaurant'} has been completed`,
      restaurantId: reservationData.restaurant_id,
      votes: 0,
      publisherId: reservationData.user_id,
    };
    
    await this.db.collection('alerts').add(alert);
    
    return {
      id,
      ...reservationData,
      isCompleted: true
    };
  } catch (error) {
    console.error(`Error marking reservation as completed: ${error}`);
    throw error;
  }
}

  async getReservationsByRestaurantId(restaurantId: string): Promise<any[]> {
    try {
      
      const snapshot = await this.db
        .collection(this.collectionName)
        .where('restaurant_id', '==', restaurantId)
        .get();
      
      if (snapshot.empty) {
        return [];
      }
      
      const reservations = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      
      return reservations;
    } catch (error) {
      console.error(`Error searching for reservations with that restaurat id: ${error}`);
      throw error;
    }
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
