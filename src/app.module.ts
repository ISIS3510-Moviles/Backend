import { Module } from '@nestjs/common';
import { ProductModule } from './product/product.module';
import { CommentModule } from './comment/comment.module';
import { UserModule } from './user/user.module';
import { RestaurantModule } from './restaurant/restaurant.module';
import { VisitModule } from './visit/visit.module';
import { AlertModule } from './alert/alert.module';
import { ReservationModule } from './reservation/reservation.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TagModule } from './tag/tag.module';
import { PhotoModule } from './photo/photo.module';
import { InstitutionModule } from './institution/institution.module';

@Module({
  imports: [
    AlertModule,
    CommentModule,
    InstitutionModule,
    PhotoModule,
    ProductModule,
    ReservationModule,
    RestaurantModule,
    TagModule,
    UserModule,
    VisitModule,
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'database.sqlite',
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}