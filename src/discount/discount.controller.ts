import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { DiscountService } from './discount.service';
import { CreateDiscountDto } from './dto/create-discount.dto';
import { UpdateDiscountDto } from './dto/update-discount.dto';

@Controller('discount')
export class DiscountController {
  constructor(private readonly discountService: DiscountService) {}

  @Post()
  createDiscount(@Body() createDiscountDto: CreateDiscountDto) {
    return this.discountService.createDiscount(createDiscountDto);
  }

  @Get()
  getDiscounts() {
    return this.discountService.getDiscounts();
  }

  @Get(':id')
  getDiscountById(@Param('id') id: string) {
    return this.discountService.getDiscountById(id);
  }

  @Delete(':id')
  deleteDiscount(@Param('id') id: string) {
    return this.discountService.deleteDiscount(id);
  }

  @Patch(':id')
  updateDiscount(@Param('id') id: string, @Body() updateDiscountDto: UpdateDiscountDto) {
    return this.discountService.updateDiscount(id, updateDiscountDto);
  }
}
