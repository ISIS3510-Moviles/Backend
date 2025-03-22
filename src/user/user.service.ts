import { Injectable } from '@nestjs/common';
import admin from 'firebase.config'; 
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  private db = admin.firestore();
  private collectionName = 'users';

  async createUser(user: CreateUserDto): Promise<any> {
    const docRef = this.db.collection(this.collectionName).doc();
    await docRef.set(user);
    return { id: docRef.id, ...user };
  }

  async getUsers(): Promise<any[]> {
    const snapshot = await this.db.collection(this.collectionName).get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }

  async getUserById(id: string): Promise<any | null> {
    const doc = await this.db.collection(this.collectionName).doc(id).get();
    return doc.exists ? { id: doc.id, ...doc.data() } : null;
  }

  async deleteUser(id: string): Promise<boolean> {
    await this.db.collection(this.collectionName).doc(id).delete();
    return true;
  }

  async updateUser(id: string, user: UpdateUserDto): Promise<boolean> {
    await this.db
      .collection(this.collectionName)
      .doc(id)
      .update(user as unknown as FirebaseFirestore.UpdateData<FirebaseFirestore.DocumentData>);
    return true;
  }
}
