export class UpdateUserDto {
    name?: string;
    phone?: string;
    email?: string;
    role?: string;
    isPremium?: boolean;
    badgesIds?: string[];
    schedulesIds?: string[];
    reservationsIds?: string[];
    institutionId?: string;
    dietaryPreferencesTagIds?: string[];
    commentsIds?: string[];
    visitsIds?: string[];
    suscribedRestaurantIds?: string[];
    publishedAlertsIds?: string[];  
    savedProductsIds?: string[];
    vendorRestaurantId?: string;
}
