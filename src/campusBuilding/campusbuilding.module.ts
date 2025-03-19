import { Module } from '@nestjs/common';
import { CampusBuildingService } from './campusbuilding.service';
import { CampusBuildingController } from './campusbuilding.controller';

@Module({
  controllers: [CampusBuildingController],
  providers: [CampusBuildingService],
})
export class CampusBuildingModule {}
