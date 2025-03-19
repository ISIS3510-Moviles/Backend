import { Product } from './product.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  createProduct(product: CreateProductDto): Promise<Product> {
    const newProduct = this.productRepository.create(product);
    return this.productRepository.save(newProduct);
  }

  getProducts(): Promise<Product[]> {
    return this.productRepository.find();
  }

  getProductById(id: number): Promise<Product | null> {
    return this.productRepository.findOne({ where: { id } });
  }

  deleteProduct(id: number): Promise<DeleteResult> {
    return this.productRepository.delete({ id });
  }

  updateProduct(id: number, product: UpdateProductDto): Promise<UpdateResult> {
    return this.productRepository.update({ id }, product);
  }
}
