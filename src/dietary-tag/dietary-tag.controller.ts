import { Controller, Post, Get, Param, Delete, Patch, Body } from '@nestjs/common';
import { DietaryTagService } from './dietary-tag.service';
import { CreateDietaryTagDto } from './dto/create-dietaryTag.dto';
import { UpdateDietaryTagDto } from './dto/update-dietaryTag.dto';

@Controller('dietary-tag')
export class DietaryTagController {
  constructor(private readonly dietaryTagService: DietaryTagService) {}

  @Post()
  createDietaryTag(@Body() createDietaryTagDto: CreateDietaryTagDto) {
    return this.dietaryTagService.createDietaryTag(createDietaryTagDto);
  }

  @Get()
  getDietaryTags() {
    return this.dietaryTagService.getDietaryTags();
  }

  @Get(':id')
  getDietaryTagById(@Param('id') id: string) {
    return this.dietaryTagService.getDietaryTagById(id);
  }

  @Delete(':id')
  deleteDietaryTag(@Param('id') id: string) {
    return this.dietaryTagService.deleteDietaryTag(id);
  }

  @Patch(':id')
  updateDietaryTag(
    @Param('id') id: string,
    @Body() updateDietaryTagDto: UpdateDietaryTagDto,
  ) {
    return this.dietaryTagService.updateDietaryTag(id, updateDietaryTagDto);
  }
}
