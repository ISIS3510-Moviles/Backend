import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FoodTag } from './food-tag.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { CreateFoodTagDto } from './dto/create-foodTag.dto';
import { UpdateFoodTagDto } from './dto/update-foodTag.dto';

@Injectable()
export class FoodTagService {
  constructor(
    @InjectRepository(FoodTag)
    private foodTagRepository: Repository<FoodTag>,
  ) {}

  createFoodTag(foodTag: CreateFoodTagDto): Promise<FoodTag> {
    const newFoodTag = this.foodTagRepository.create(foodTag);
    return this.foodTagRepository.save(newFoodTag);
  }

  getFoodTags(): Promise<FoodTag[]> {
    return this.foodTagRepository.find();
  }

  getFoodTagById(id: number): Promise<FoodTag | null> {
    return this.foodTagRepository.findOne({ where: { id } });
  }

  deleteFoodTag(id: number): Promise<DeleteResult> {
    return this.foodTagRepository.delete({ id });
  }

  updateFoodTag(id: number, foodTag: UpdateFoodTagDto): Promise<UpdateResult> {
    return this.foodTagRepository.update({ id }, foodTag);
  }
}
