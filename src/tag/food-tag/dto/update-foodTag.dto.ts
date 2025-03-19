import { PartialType } from '@nestjs/mapped-types';
import { CreateFoodTagDto } from './create-foodTag.dto';

export class UpdateFoodTagDto extends PartialType(CreateFoodTagDto) {}