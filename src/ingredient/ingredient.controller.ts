import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { IngredientService } from './ingredient.service';
import { CreateIngredientDto } from './dto/create-ingredient.dto';
import { UpdateIngredientDto } from './dto/update-ingredient.dto';

@Controller('ingredient')
export class IngredientController {
  constructor(private readonly ingredientService: IngredientService) {}

  @Post()
  createIngredient(@Body() createIngredientDto: CreateIngredientDto) {
    return this.ingredientService.createIngredient(createIngredientDto);
  }

  @Get()
  getIngredients() {
    return this.ingredientService.getIngredients();
  }

  @Get(':id')
  getIngredientById(@Param('id') id: string) {
    return this.ingredientService.getIngredientById(id);
  }

  @Delete(':id')
  deleteIngredient(@Param('id') id: string) {
    return this.ingredientService.deleteIngredient(id);
  }

  @Patch(':id')
  updateIngredient(@Param('id') id: string, @Body() updateIngredientDto: UpdateIngredientDto) {
    return this.ingredientService.updateIngredient(id, updateIngredientDto);
  }
}
