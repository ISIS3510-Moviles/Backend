import { FoodTag } from 'src/tag/food-tag/food-tag.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { FoodSchedule } from '../food-schedule.entity';

@Entity()
export class FreeTime {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  startHour: string;

  @Column()
  endHour: string;

  @ManyToMany(() => FoodTag)
  @JoinTable()
  tags: FoodTag[];

  @ManyToOne(() => FoodSchedule, (foodSchedule) => foodSchedule.freeTimes)
  schedule: FoodSchedule;
}