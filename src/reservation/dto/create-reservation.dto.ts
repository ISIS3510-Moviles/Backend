export class CreateReservationDto {
  date: string;
  time: string;
  numberComensals: number;
  isCompleted: boolean;
  restaurant_id: string;
  user_id: string;
  hasBeenCancelled: boolean = false;
}
