import { Injectable, NotFoundException } from '@nestjs/common';
import admin from 'firebase.config';
import { CreateIngredientDto } from './dto/create-ingredient.dto';
import { UpdateIngredientDto } from './dto/update-ingredient.dto';

@Injectable()
export class IngredientService {
  private db = admin.firestore();
  private collectionName = 'ingredients';

  async createIngredient(createIngredientDto: CreateIngredientDto): Promise<any> {
    const ingredientData = {
      ...createIngredientDto,
      clicks: createIngredientDto.clicks || 0
    };
    
    const docRef = this.db.collection(this.collectionName).doc();
    await docRef.set({
      id: docRef.id,
      ...ingredientData
    });
    
    return {
      id: docRef.id,
      ...ingredientData
    };
  }

  async getIngredients(): Promise<any[]> {
    const snapshot = await this.db
      .collection(this.collectionName)
      .orderBy('clicks', 'desc')
      .get();
    
    return snapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        clicks: data.clicks || 0
      };
    });
  }

  async incrementClicks(id: string): Promise<any> {
    try {
      const docRef = this.db.collection(this.collectionName).doc(id);
      const doc = await docRef.get();
      
      if (!doc.exists) {
        throw new NotFoundException(`Ingrediente con ID ${id} no encontrado`);
      }
      
      const data = doc.data() as FirebaseFirestore.DocumentData;
      
      const currentClicks = data.clicks || 0;
      const newClicks = currentClicks + 1;
      
      await docRef.update({ clicks: newClicks });
      
      return {
        id,
        ...data,
        clicks: newClicks
      };
    } catch (error) {
      console.error(`Error al incrementar clicks: ${error}`);
      throw error;
    }
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
