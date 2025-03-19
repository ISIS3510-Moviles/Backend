import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Visit } from './visit.entity';
import { VisitService } from './visit.service';

@Module({
  imports: [TypeOrmModule.forFeature([Visit])],
  controllers: [],
  providers: [VisitService],
})
export class VisitModule {}
