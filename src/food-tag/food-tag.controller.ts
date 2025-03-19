import { Controller, Post, Get, Param, Delete, Patch, Body } from '@nestjs/common';
import { FoodTagService } from './food-tag.service';
import { CreateFoodTagDto } from './dto/create-foodTag.dto';
import { UpdateFoodTagDto } from './dto/update-foodTag.dto';

@Controller('food-tag')
export class FoodTagController {
  constructor(private readonly foodTagService: FoodTagService) {}

  @Post()
  createFoodTag(@Body() createFoodTagDto: CreateFoodTagDto) {
    return this.foodTagService.createFoodTag(createFoodTagDto);
  }

  @Get()
  getFoodTags() {
    return this.foodTagService.getFoodTags();
  }

  @Get(':id')
  getFoodTagById(@Param('id') id: string) {
    return this.foodTagService.getFoodTagById(id);
  }

  @Delete(':id')
  deleteFoodTag(@Param('id') id: string) {
    return this.foodTagService.deleteFoodTag(id);
  }

  @Patch(':id')
  updateFoodTag(
    @Param('id') id: string,
    @Body() updateFoodTagDto: UpdateFoodTagDto,
  ) {
    return this.foodTagService.updateFoodTag(id, updateFoodTagDto);
  }
}
