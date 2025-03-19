export class CreateDiscountDto {
    name: string;
    startDate: Date; 
    endDate: Date;
    description: string;
    percentage: number;
    discountedPrice: number;
    isAvailable: boolean;
    discountedProductsIds?: string[];
  }
  