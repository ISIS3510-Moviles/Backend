import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Discount {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  startDate: Date;

  @Column()
  endDate: Date;

  @Column()
  description: string;

  @Column()
  percentage: number;

  @Column()
  discountedPrice: number;

  @Column()
  isAvailable: boolean;
}