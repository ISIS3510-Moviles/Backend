import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { FirebaseAuthGuard } from './firebase-auth.guard';
import { FirebaseAuthService } from './firebase-auth.service';

@Module({
  controllers: [AuthController],
  providers: [FirebaseAuthService, FirebaseAuthGuard],
  exports: [FirebaseAuthService], 
})
export class AuthModule {}
