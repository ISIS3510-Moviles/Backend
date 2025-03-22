export class CreateCommentDto {
  message: string;
  rating: number;
  likes?: number; 
  isVisible: boolean;
  photos?: string[];
  responseToId?: string; // Comment that this comment is a response to
  restaurantId?: string;
  productId?: string; // Product that this comment is about (if any)
  reportsIds?: string[];
  responsesIds?: string[]; // Comments that are responses to this comment
  authorId: string;
  datetime?: Date;
}
