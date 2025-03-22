export class CreateReservationDto {
  date: Date;
  time: string;
  numberComensals: number;
  isCompleted: boolean;
  restaurant_id: string;
  user_id: string;
}
