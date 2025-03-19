import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { RestaurantService } from './restaurant.service';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';

@Controller('restaurant')
export class RestaurantController {
  constructor(private restaurantService: RestaurantService) {}

  @Post()
  createRestaurant(@Body() createRestaurantDto: CreateRestaurantDto) {
    return this.restaurantService.createRestaurant(createRestaurantDto);
  }

  @Get()
  getRestaurants() {
    return this.restaurantService.getRestaurants();
  }

  @Get(':id')
  getRestaurantById(@Param('id', ParseIntPipe) id: number) {
    return this.restaurantService.getRestaurantById(id);
  }

  @Delete(':id')
  deleteRestaurantById(@Param('id', ParseIntPipe) id: number) {
    return this.restaurantService.deleteRestaurant(id);
  }

  @Patch(':id')
  updateRestaurantById(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateRestaurantDto: UpdateRestaurantDto,
  ) {
    return this.restaurantService.updateRestaurant(id, updateRestaurantDto);
  }
}
