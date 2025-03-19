import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DietaryTag } from './dietary-tag.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { CreateDietaryTagDto } from './dto/create-dietaryTag.dto';
import { UpdateDietaryTagDto } from './dto/update-dietaryTag.dto';

@Injectable()
export class DietaryTagService {
  constructor(
    @InjectRepository(DietaryTag)
    private dietaryTagRepository: Repository<DietaryTag>,
  ) {}

  createDietaryTag(dietaryTag: CreateDietaryTagDto): Promise<DietaryTag> {
    const newDietaryTag = this.dietaryTagRepository.create(dietaryTag);
    return this.dietaryTagRepository.save(newDietaryTag);
  }

  getDietaryTags(): Promise<DietaryTag[]> {
    return this.dietaryTagRepository.find();
  }

  getDietaryTagById(id: number): Promise<DietaryTag | null> {
    return this.dietaryTagRepository.findOne({ where: { id } });
  }

  deleteDietaryTag(id: number): Promise<DeleteResult> {
    return this.dietaryTagRepository.delete({ id });
  }

  updateDietaryTag(
    id: number,
    dietaryTag: UpdateDietaryTagDto,
  ): Promise<UpdateResult> {
    return this.dietaryTagRepository.update({ id }, dietaryTag);
  }
}
