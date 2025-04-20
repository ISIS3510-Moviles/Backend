import { Injectable } from '@nestjs/common';
import admin from 'firebase.config';
import { CreateReportDto } from 'src/report/dto/create-report.dto';
import { UpdateReportDto } from 'src/report/dto/update-report.dto';

@Injectable()
export class ReportService {
  private db = admin.firestore();
  private collectionName = 'reports';

  async createReport(report: CreateReportDto): Promise<any> {
    const reportRef = this.db.collection(this.collectionName).doc();
    const reportData = { id: reportRef.id, ...report };
    await reportRef.set(reportData);
    return reportData;
  }

  async getReports(): Promise<any[]> {
    const snapshot = await this.db.collection(this.collectionName).get();
    return snapshot.docs.map(doc => doc.data());
  }

  async getReportById(id: string): Promise<any | null> {
    const doc = await this.db.collection(this.collectionName).doc(id).get();
    return doc.exists ? doc.data() : null;
  }

  async deleteReport(id: string): Promise<boolean> {
    await this.db.collection(this.collectionName).doc(id).delete();
    return true;
  }

  async updateReport(id: string, updateReportDto: UpdateReportDto): Promise<boolean> {
    await this.db
      .collection(this.collectionName)
      .doc(id)
      .update(updateReportDto as unknown as FirebaseFirestore.UpdateData<FirebaseFirestore.DocumentData>);
    return true;
  }
}
