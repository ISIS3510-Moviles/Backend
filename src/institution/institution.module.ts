import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Institution } from './institution.entity';
import { CampusBuilding } from './campus-building/campus-building.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Institution, CampusBuilding])],
  providers: [],
  controllers: [],
})
export class InstitutionModule {}