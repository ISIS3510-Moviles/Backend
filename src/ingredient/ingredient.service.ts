import { Injectable } from '@nestjs/common';
import admin from 'firebase.config';
import { CreateIngredientDto } from './dto/create-ingredient.dto';
import { UpdateIngredientDto } from './dto/update-ingredient.dto';

@Injectable()
export class IngredientService {
  private db = admin.firestore();
  private collectionName = 'ingredients';

  async createIngredient(createIngredientDto: CreateIngredientDto): Promise<any> {
    const ingredientRef = this.db.collection(this.collectionName).doc();
    const ingredientData = { id: ingredientRef.id, ...createIngredientDto };
    await ingredientRef.set(ingredientData);
    return ingredientData;
  }

  async getIngredients(): Promise<any[]> {
    const snapshot = await this.db.collection(this.collectionName).get();
    return snapshot.docs.map(doc => doc.data());
  }

  async getIngredientById(id: string): Promise<any | null> {
    const doc = await this.db.collection(this.collectionName).doc(id).get();
    return doc.exists ? doc.data() : null;
  }

  async deleteIngredient(id: string): Promise<boolean> {
    await this.db.collection(this.collectionName).doc(id).delete();
    return true;
  }

  async updateIngredient(id: string, updateIngredientDto: UpdateIngredientDto): Promise<boolean> {
    await this.db.collection(this.collectionName).doc(id).update(
      updateIngredientDto as unknown as FirebaseFirestore.UpdateData<FirebaseFirestore.DocumentData>
    );
    return true;
  }
}
