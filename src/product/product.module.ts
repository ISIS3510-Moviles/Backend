import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { Ingredient } from './ingredient/ingredient.entity';
import { Discount } from './discount/discount.entity';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';

@Module({
    imports: [TypeOrmModule.forFeature([Product, Ingredient, Discount])],
    providers: [ProductService],
    controllers: [ProductController],
})
export class ProductModule {}