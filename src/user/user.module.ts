import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Badge } from './badge/badge.entity';
import { FoodSchedule } from './food-schedule/food-schedule.entity';
import { FreeTime } from './food-schedule/free-time/free-time.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Badge, FoodSchedule, FreeTime])],
  providers: [],
  controllers: [],
})
export class UserModule {}