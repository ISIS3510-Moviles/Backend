import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';
import { CommentModule } from './comment/comment.module';
import { UserModule } from './user/user.module';
import { RestaurantModule } from './restaurant/restaurant.module';
import { VisitModule } from './visit/visit.module';
import { AlertModule } from './alert/alert.module';
import { ReservationModule } from './reservation/reservation.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FirebaseService } from 'src/firebase.service'; 
import { InstitutionModule } from './institution/institution.module';
import { BadgeModule } from './badge/badge.module';
import { CampusBuildingModule } from './campusBuilding/campusbuilding.module';
import { DiscountModule } from './discount/discount.module';
import { FoodScheduleModule } from './foodschedule/foodschedule.module';
import { FreeTimeModule } from './freetime/freetime.module';
import { IngredientModule } from './ingredient/ingredient.module';
import { ReportModule } from './report/report.module';
import { FoodTagModule } from './food-tag/food-tag.module';
import { DietaryTagModule } from './dietary-tag/dietary-tag.module';
import { AuthModule } from './auth.module';

@Module({
  imports: [
    AuthModule,
    AlertModule,
    BadgeModule,
    CampusBuildingModule,
    CommentModule,
    DiscountModule,
    FoodScheduleModule,
    FreeTimeModule,
    IngredientModule,
    InstitutionModule,
    ProductModule,
    ReportModule,
    ReservationModule,
    RestaurantModule,
    FoodTagModule,
    DietaryTagModule,
    UserModule,
    VisitModule,
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'database.sqlite',
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService, FirebaseService], 
  exports: [FirebaseService],
})
export class AppModule {}
