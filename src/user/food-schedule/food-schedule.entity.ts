import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { FreeTime } from './free-time/free-time.entity';
import { User } from '../user.entity';

@Entity()
export class FoodSchedule {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  isActual: boolean;

  @OneToMany(() => FreeTime, (freeTime) => freeTime.schedule)
  freeTimes: FreeTime[];

  @ManyToOne(() => User, (user) => user.schedules, { onDelete: 'CASCADE' })
  user: User;
}