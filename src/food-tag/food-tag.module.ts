import { Module } from '@nestjs/common';
import { FoodTagService } from './food-tag.service';
import { FoodTagController } from './food-tag.controller';

@Module({
  controllers: [FoodTagController],
  providers: [FoodTagService],
  exports: [FoodTagService],
})
export class FoodTagModule {}
