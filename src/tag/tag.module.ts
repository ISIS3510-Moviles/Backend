import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tag } from './tag.entity';
import { FoodTag } from './food-tag/food-tag.entity';
import { DietaryTag } from './dietary-tag/dietary-tag.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Tag, FoodTag, DietaryTag])],
})
export class TagModule {}