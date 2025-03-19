export class CreateRestaurantDto {
  name: string;
  description: string;
  latitude: number;
  longitude: number;
  routeIndications: string;
  openingTime: Date;
  closingTime: Date;
  opensHolidays: boolean;
  opensWeekends: boolean;
  isActive: boolean;
  rating?: number;
  address?: string;
  phone?: string;
  email?: string;
  overviewPhoto?: string;
  profilePhoto?: string;
  photos?: string[];
  foodTagsIds?: string[];
  dietaryTagsIds?: string[];
  alertsIds?: string[];
  reservationsIds?: string[];
  suscribersIds?: string[];
  visitsIds?: string[];
  commentsIds?: string[];
  productsIds?: string[];
}
