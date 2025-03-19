import { PartialType } from '@nestjs/mapped-types';
import { CreateDietaryTagDto } from './create-dietaryTag.dto';

export class UpdateDietaryTagDto extends PartialType(CreateDietaryTagDto) {}