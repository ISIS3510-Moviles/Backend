
export class CreateProductDto {
  name: string;
  description: string;
  price: number;
  photo: string;
  restaurant_id: string;
  rating?: number;
  ingredientsIds?: string[]; 
  discountsIds?: string[];       
  commentsIds?: string[];
  foodTagIds?: string[];
  dietaryTagIds?: string[];
}
