import { Injectable } from '@nestjs/common';
import admin from 'firebase.config';
import { CreateCampusBuildingDto } from 'src/campusBuilding/dto/create-campus-building.dto';
import { UpdateCampusBuildingDto } from 'src/campusBuilding/dto/update-campus-building.dto';

@Injectable()
export class CampusBuildingService {
  private db = admin.firestore();
  private collectionName = 'campusBuildings';

  async createCampusBuilding(createCampusBuildingDto: CreateCampusBuildingDto): Promise<any> {
    const docRef = this.db.collection(this.collectionName).doc();
    const campusBuildingData = { id: docRef.id, ...createCampusBuildingDto };
    await docRef.set(campusBuildingData);
    return campusBuildingData;
  }

  async getCampusBuildings(): Promise<any[]> {
    const snapshot = await this.db.collection(this.collectionName).get();
    return snapshot.docs.map(doc => doc.data());
  }

  async getCampusBuildingById(id: string): Promise<any | null> {
    const doc = await this.db.collection(this.collectionName).doc(id).get();
    return doc.exists ? doc.data() : null;
  }

  async deleteCampusBuilding(id: string): Promise<boolean> {
    await this.db.collection(this.collectionName).doc(id).delete();
    return true;
  }

  async updateCampusBuilding(id: string, updateCampusBuildingDto: UpdateCampusBuildingDto): Promise<boolean> {
    await this.db.collection(this.collectionName).doc(id).update(
      updateCampusBuildingDto as unknown as FirebaseFirestore.UpdateData<FirebaseFirestore.DocumentData>
    );
    return true;
  }
}
