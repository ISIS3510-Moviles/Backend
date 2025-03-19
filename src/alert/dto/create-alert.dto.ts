export class CreateAlertDto {
  message: string;
  date: Date;
  icon?: string;
  votes?: number;
  restaurantId?: string;
  publisherId?: string;
}
