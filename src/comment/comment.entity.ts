import { Product } from 'src/product/product.entity';
import { Restaurant } from 'src/restaurant/restaurant.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Report } from 'src/comment/report/report.entity';
import { User } from 'src/user/user.entity';
import { Photo } from 'src/photo/photo.entity';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  datetime: Date;

  @Column()
  message: string;

  @Column()
  rating: number;

  @Column()
  likes: number;

  @Column()
  isVisible: boolean;

  @OneToMany(() => Photo, (photo) => photo.comment)
  photos: Photo[];

  @OneToMany(() => Comment, (comment) => comment.response_to)
  responses: Comment[];

  @ManyToOne(() => Comment, (comment) => comment.responses, {
    onDelete: 'CASCADE',
  })
  response_to: Comment;

  @ManyToOne(() => Restaurant, (restaurant) => restaurant.comments, {
    onDelete: 'CASCADE',
  })
  restaurant: Restaurant;

  @ManyToOne(() => Product, (product) => product.comments, {
    onDelete: 'CASCADE',
  })
  product: Product;

  @OneToMany(() => Report, (report) => report.comment)
  reports: Report[];

  @ManyToOne(() => User, (user) => user.comments, { onDelete: 'CASCADE' })
  author: User;
}