import { Module } from '@nestjs/common';
import { FoodScheduleService } from './foodschedule.service';
import { FoodScheduleController } from './foodschedule.controller';

@Module({
  controllers: [FoodScheduleController],
  providers: [FoodScheduleService],
})
export class FoodScheduleModule {}
