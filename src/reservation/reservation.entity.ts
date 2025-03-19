import { Restaurant } from 'src/restaurant/restaurant.entity';
import { User } from 'src/user/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Reservation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'date', default: () => 'CURRENT_TIMESTAMP' })
  date: Date;

  @Column()
  time: string;

  @Column()
  numberComensals: number;

  @Column()
  isCompleted: boolean;

  @ManyToOne(() => Restaurant, (restaurant) => restaurant.reservations, {
    onDelete: 'CASCADE',
  })
  restaurant: Restaurant;

  @ManyToOne(() => User, (user) => user.reservations, { onDelete: 'CASCADE' })
  user: User;
}