import { Injectable } from '@nestjs/common';
import admin from 'firebase.config'; 
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Injectable()
export class CommentService {
  private db = admin.firestore();  
  private collectionName = 'comments';

  async createComment(comment: CreateCommentDto): Promise<any> {
    const commentRef = this.db.collection(this.collectionName).doc();
    await commentRef.set(comment);
    return { id: commentRef.id, ...comment };
  }

  async getComments(): Promise<any[]> {
    const snapshot = await this.db.collection(this.collectionName).get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }


  async getCommentsByRestaurantId(restaurantId: string): Promise<any[]> {
    const snapshot = await this.db
      .collection(this.collectionName)
      .where('restaurantId', '==', restaurantId)
      .get();
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  }


  async getCommentById(id: string): Promise<any | null> {
    const doc = await this.db.collection(this.collectionName).doc(id).get();
    return doc.exists ? { id: doc.id, ...doc.data() } : null;
  }

  async deleteComment(id: string): Promise<boolean> {
    await this.db.collection(this.collectionName).doc(id).delete();
    return true;
  }

  async updateComment(id: string, comment: UpdateCommentDto): Promise<boolean> {
    await this.db
      .collection(this.collectionName)
      .doc(id)
      .update(comment as unknown as FirebaseFirestore.UpdateData<FirebaseFirestore.DocumentData>);
    return true;
  }
}
