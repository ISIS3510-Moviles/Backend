import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Restaurant } from './restaurant.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';

@Injectable()
export class RestaurantService {
  constructor(
    @InjectRepository(Restaurant)
    private restaurantRepository: Repository<Restaurant>,
  ) {}

  createRestaurant(restaurant: CreateRestaurantDto): Promise<Restaurant> {
    const newRestaurant = this.restaurantRepository.create(restaurant);
    return this.restaurantRepository.save(newRestaurant);
  }

  getRestaurants(): Promise<Restaurant[]> {
    return this.restaurantRepository.find();
  }

  getRestaurantById(id: number): Promise<Restaurant | null> {
    return this.restaurantRepository.findOne({ where: { id } });
  }

  deleteRestaurant(id: number): Promise<DeleteResult> {
    return this.restaurantRepository.delete({ id });
  }

  updateRestaurant(
    id: number,
    restaurant: UpdateRestaurantDto,
  ): Promise<UpdateResult> {
    return this.restaurantRepository.update({ id }, restaurant);
  }
}
