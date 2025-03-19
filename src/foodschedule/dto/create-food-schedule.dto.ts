export class CreateFoodScheduleDto {
  name: string;
  isActual: boolean;
  freeTimesIds?: string[];
  userId: string;
}
