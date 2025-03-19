import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { FirebaseService } from 'src/firebase.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly firebaseService: FirebaseService
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('data')
  async getDataFromFirestore() {
    return await this.firebaseService.getDocuments('tu_coleccion');
  }
}
