export class UpdateDiscountDto {
  name?: string;
  startDate?: Date; 
  endDate?: Date;
  description?: string;
  percentage?: number;
  discountedPrice?: number;
  isAvailable?: boolean;
  discountedProductsIds?: string[];
  }
  