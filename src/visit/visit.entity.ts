import { Restaurant } from 'src/restaurant/restaurant.entity';
import { User } from 'src/user/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Visit {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'date', default: () => 'CURRENT_TIMESTAMP' })
  date: Date;

  @Column()
  time: string;

  @ManyToOne(() => Restaurant, (restaurant) => restaurant.visits, {
    onDelete: 'CASCADE',
  })
  vendor: Restaurant;

  @ManyToOne(() => User, (user) => user.visits, { onDelete: 'CASCADE' })
  visitor: User;
}
