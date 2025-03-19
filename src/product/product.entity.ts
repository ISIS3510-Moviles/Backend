import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { Ingredient } from './ingredient/ingredient.entity';
import { Comment } from 'src/comment/comment.entity';
import { Discount } from './discount/discount.entity';
import { Photo } from 'src/photo/photo.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Photo)
  photo: Photo;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  rating: number;

  @Column()
  price: number;

  @Column()
  isAvailable: boolean;

  @ManyToMany(() => Ingredient)
  @JoinTable()
  categories: Ingredient[];

  @ManyToMany(() => Discount)
  @JoinTable()
  discounts: Discount[];

  @OneToMany(() => Comment, (comment) => comment.product)
  comments: Comment[];

  @ManyToMany(() => Ingredient, (ingredient) => ingredient.products)
  @JoinTable()
  ingredients: Ingredient[];
}