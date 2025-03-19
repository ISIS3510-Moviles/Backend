import { Restaurant } from 'src/restaurant/restaurant.entity';
import { User } from 'src/user/user.entity';
import { Photo } from 'src/photo/photo.entity';
import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  OneToOne,
} from 'typeorm';

@Entity()
export class Alert {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  datetime: Date;

  @OneToOne(() => Photo)
  icon: Photo;

  @Column()
  votes: number;

  @Column()
  message: string;

  @ManyToOne(() => Restaurant, (restaurant) => restaurant.alerts, {
    onDelete: 'CASCADE',
  })
  restaurant: Restaurant;

  @ManyToOne(() => User, (user) => user.publishedAlerts, {
    onDelete: 'CASCADE',
  })
  publisher: User;
}
