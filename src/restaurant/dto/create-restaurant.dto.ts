export class CreateRestaurantDto {
  name: string;
  description: string;
  rating: number;
  latitude: number;
  longitude: number;
  routeIndications: string;
  openingTime: Date;
  closingTime: Date;
  opensHolidays: boolean;
  opensWeekends: boolean;
  isActive: boolean;
}
