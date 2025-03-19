import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Institution } from './institution.entity';
import { CampusBuilding } from './campus-building/campus-building.entity';
import { InstitutionService } from './institution.service';

@Module({
  imports: [TypeOrmModule.forFeature([Institution, CampusBuilding])],
  providers: [InstitutionService],
  controllers: [],
})
export class InstitutionModule {}