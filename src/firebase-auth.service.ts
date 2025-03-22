import { Injectable, OnModuleInit } from '@nestjs/common';
import * as admin from 'firebase-admin';
import * as fs from 'fs';

@Injectable()
export class FirebaseAuthService implements OnModuleInit {
  onModuleInit() {
    const credentialsPath = 'src/firebasekey.json';

    if (!fs.existsSync(credentialsPath)) {
      throw new Error(`El archivo de credenciales no existe en la ruta: ${credentialsPath}`);
    }

    const credentials = JSON.parse(fs.readFileSync(credentialsPath, 'utf-8'));

    if (!admin.apps.length) {
      admin.initializeApp({
        credential: admin.credential.cert(credentials),
      });
    }
  }

  async verifyToken(token: string) {
    return admin.auth().verifyIdToken(token);
  }
}
