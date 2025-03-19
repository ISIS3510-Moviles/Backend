import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { FoodScheduleService } from './foodschedule.service';
import { CreateFoodScheduleDto } from './dto/create-food-schedule.dto';
import { UpdateFoodScheduleDto } from './dto/update-food-schedule.dto';

@Controller('food-schedule')
export class FoodScheduleController {
  constructor(private readonly foodScheduleService: FoodScheduleService) {}

  @Post()
  createFoodSchedule(@Body() createFoodScheduleDto: CreateFoodScheduleDto) {
    return this.foodScheduleService.createFoodSchedule(createFoodScheduleDto);
  }

  @Get()
  getFoodSchedules() {
    return this.foodScheduleService.getFoodSchedules();
  }

  @Get(':id')
  getFoodScheduleById(@Param('id') id: string) {
    return this.foodScheduleService.getFoodScheduleById(id);
  }

  @Delete(':id')
  deleteFoodSchedule(@Param('id') id: string) {
    return this.foodScheduleService.deleteFoodSchedule(id);
  }

  @Patch(':id')
  updateFoodSchedule(
    @Param('id') id: string,
    @Body() updateFoodScheduleDto: UpdateFoodScheduleDto,
  ) {
    return this.foodScheduleService.updateFoodSchedule(id, updateFoodScheduleDto);
  }
}
