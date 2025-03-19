import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tag } from './tag.entity';
import { FoodTag } from './food-tag/food-tag.entity';
import { DietaryTag } from './dietary-tag/dietary-tag.entity';
import { FoodTagService } from './food-tag/food-tag.service';
import { DietaryTagService } from './dietary-tag/dietary-tag.service';
import { FoodTagController } from './food-tag/food-tag.controller';
import { DietaryTagController } from './dietary-tag/dietary-tag.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Tag, FoodTag, DietaryTag])],
  providers: [FoodTagService, DietaryTagService],
  controllers: [FoodTagController, DietaryTagController],
})
export class TagModule {}