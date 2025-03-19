import { Alert } from 'src/alert/alert.entity';
import { Visit } from 'src/visit/visit.entity';
import { Comment } from 'src/comment/comment.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToMany,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { Reservation } from 'src/reservation/reservation.entity';
import { FoodTag } from 'src/tag/food-tag/food-tag.entity';
import { DietaryTag } from 'src/tag/dietary-tag/dietary-tag.entity';
import { Photo } from 'src/photo/photo.entity';

@Entity()
export class Restaurant {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => Photo, (photo) => photo.restaurant)
  photos: Photo[];

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  rating: number;

  @Column()
  latitude: number;

  @Column()
  longitude: number;

  @Column()
  routeIndications: string;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  openingTime: Date;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  closingTime: Date;

  @Column()
  opensHolidays: boolean;

  @Column()
  opensWeekends: boolean;

  @Column()
  isActive: boolean;

  @OneToOne(() => Photo)
  overviewPhoto: Photo;

  @OneToOne(() => Photo)
  profilePhoto: Photo;

  @OneToMany(() => Alert, (alert) => alert.restaurant)
  alerts: Alert[];

  @OneToMany(() => Visit, (visit) => visit.vendor)
  visits: Visit[];

  @OneToMany(() => Comment, (comment) => comment.restaurant)
  comments: Comment[];

  @OneToMany(() => Reservation, (reservation) => reservation.restaurant)
  reservations: Reservation[];

  @ManyToMany(() => FoodTag)
  @JoinColumn()
  foodTags: FoodTag[];

  @ManyToMany(() => DietaryTag)
  @JoinColumn()
  dietaryTags: DietaryTag[];
}