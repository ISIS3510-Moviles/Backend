import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';
import { Comment } from '../comment/comment.entity';
import { Badge } from './badge/badge.entity';
import { Reservation } from 'src/reservation/reservation.entity';
import { Alert } from 'src/alert/alert.entity';
import { Visit } from 'src/visit/visit.entity';
import { DietaryTag } from 'src/tag/dietary-tag/dietary-tag.entity';
import { FoodSchedule } from './food-schedule/food-schedule.entity';
import { Institution } from 'src/institution/institution.entity';
import { Photo } from 'src/photo/photo.entity';

export enum UserRole {
  UNDERGRADUATE_STUDENT = 'UNDERGRADUATE_STUDENT',
  POSTGRADUATE_STUDENT = 'POSTGRADUATE_STUDENT',
  PROFESSOR = 'PROFESSOR',
  STAFF_MEMBER = 'STAFF_MEMBER',
}
@Entity()
export class User {
  @PrimaryColumn()
  identification: string;

  @Column()
  name: string;

  @Column({
    type: 'varchar',
    enum: UserRole,
    default: UserRole.UNDERGRADUATE_STUDENT,
  })
  role: UserRole;

  @Column()
  phoneNumber: string;

  @Column()
  isPremium: boolean;

  @OneToOne(() => Photo)
  @JoinColumn()
  profilePhoto: Photo;

  @OneToMany(() => Comment, (comment) => comment.author)
  comments: Comment[];

  @ManyToMany(() => Badge)
  @JoinColumn()
  badges: Badge[];

  @OneToMany(() => Reservation, (reservation) => reservation.user)
  reservations: Reservation[];

  @OneToMany(() => Alert, (alert) => alert.publisher)
  publishedAlerts: Alert[];

  @OneToMany(() => Visit, (visit) => visit.visitor)
  visits: Visit[];

  @ManyToMany(() => DietaryTag)
  @JoinColumn()
  dietaryTags: DietaryTag[];

  @OneToMany(() => FoodSchedule, (foodSchedule) => foodSchedule.user)
  schedules: FoodSchedule[];

  @OneToOne(() => Institution)
  @JoinColumn()
  institution: Institution;
}