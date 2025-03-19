export class CreateCommentDto {
  datetime: Date;
  message: string;
  rating: number;
  likes: number;
  isVisible: boolean;
}