import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { Ingredient } from './ingredient/ingredient.entity';
import { Discount } from './discount/discount.entity';
import { ProductService } from './product.service';

@Module({
    imports: [TypeOrmModule.forFeature([Product, Ingredient, Discount])],
    providers: [ProductService],
    controllers: [],
})
export class ProductModule {}