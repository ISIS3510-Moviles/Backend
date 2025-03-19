import { Column, Entity } from 'typeorm';
import { Tag } from '../tag.entity';

@Entity()
export class DietaryTag extends Tag {
  @Column()
  appearence: string;
}