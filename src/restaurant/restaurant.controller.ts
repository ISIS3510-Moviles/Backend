import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  NotFoundException,
  Query,
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
  getRestaurants(@Query('nameMatch') nameMatch?: string) {
    return this.restaurantService.getRestaurants(nameMatch);
  }

  

  @Get('full')
  getRestaurantsFull() {
    return this.restaurantService.getRestaurantsFull();
  }


  @Get(':id')
  getRestaurantById(@Param('id') id: string) {
    return this.restaurantService.getRestaurantById(id);
  }


  @Get('full/:id')
  async getRestaurantFullById(@Param('id') id: string) {
    const restaurantDoc = await this.restaurantService.getRestaurantById(id);
    if (!restaurantDoc) {
      throw new NotFoundException(`Restaurant with ID ${id} not found`);
    }
    const simulatedDoc = {
      id: restaurantDoc.id,
      data: () => restaurantDoc,
    } as FirebaseFirestore.QueryDocumentSnapshot;

    return this.restaurantService.buildRestaurantSmart(simulatedDoc);
  }


  @Delete(':id')
  deleteRestaurantById(@Param('id') id: string) {
    return this.restaurantService.deleteRestaurant(id);
  }

  @Patch(':id')
  updateRestaurantById(
    @Param('id') id: string,
    @Body() updateRestaurantDto: UpdateRestaurantDto,
  ) {
    return this.restaurantService.updateRestaurant(id, updateRestaurantDto);
  }


  @Get('by-food-tag/:tagId')
  getRestaurantsByFoodTag(@Param('tagId') tagId: string) {
    return this.restaurantService.getRestaurantsByFoodTag(tagId);
  }
}
