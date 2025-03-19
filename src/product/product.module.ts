import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { Ingredient } from './ingredient/ingredient.entity';
import { Discount } from './discount/discount.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Product, Ingredient, Discount])],
    providers: [],
    controllers: [],
})
export class ProductModule {}