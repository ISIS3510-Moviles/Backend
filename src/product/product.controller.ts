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
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Post()
  createProduct(@Body() CreateProductDto: CreateProductDto) {
    return this.productService.createProduct(CreateProductDto);
  }

  @Get()
  getProducts() {
    return this.productService.getProducts();
  }

  @Get(':id')
  getProductById(@Param('id', ParseIntPipe) id: number) {
    return this.productService.getProductById(id);
  }

  @Delete(':id')
  deleteProductById(@Param('id', ParseIntPipe) id: number) {
    return this.productService.deleteProduct(id);
  }

  @Patch(':id')
  updateProductById(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productService.updateProduct(id, updateProductDto);
  }
}
