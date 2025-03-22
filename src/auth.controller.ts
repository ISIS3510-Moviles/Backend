import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { FirebaseAuthGuard } from './firebase-auth.guard';

@Controller('auth')  
export class AuthController {
  @Get('profile')  
  @UseGuards(FirebaseAuthGuard)  
  getProfile(@Request() req) {
    return { message: 'Usuario autenticado', user: req.user };
  }
}
