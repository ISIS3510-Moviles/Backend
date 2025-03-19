import { Entity, OneToOne, JoinColumn } from 'typeorm';
import { Tag } from '../tag.entity';
import { Photo } from 'src/photo/photo.entity';

@Entity()
export class FoodTag extends Tag {
  @OneToOne(() => Photo)
  @JoinColumn()
  icon: Photo;
}