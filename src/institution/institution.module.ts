import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Institution } from './institution.entity';
import { CampusBuilding } from './campus-building/campus-building.entity';
import { InstitutionService } from './institution.service';
import { InstitutionController } from './institution.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Institution, CampusBuilding])],
  providers: [InstitutionService],
  controllers: [InstitutionController],
})
export class InstitutionModule {}