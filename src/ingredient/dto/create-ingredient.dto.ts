export class CreateIngredientDto {
  name: string;
  description: string;
  productsIds?: string[];
  image?: string;
  clicks: number = 0;    
}