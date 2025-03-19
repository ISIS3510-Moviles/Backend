import { Restaurant } from 'src/restaurant/restaurant.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Comment } from '../comment/comment.entity';

@Entity()
export class Photo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  image: string;

  @Column()
  description: string;

  @ManyToOne(() => Restaurant, (restaurant) => restaurant.photos, {
    onDelete: 'CASCADE',
    nullable: true,
  })
  restaurant: Restaurant;

  @ManyToOne(() => Comment, (comment) => comment.photos, {
    onDelete: 'CASCADE',
    nullable: true,
  })
  comment: Comment;
}