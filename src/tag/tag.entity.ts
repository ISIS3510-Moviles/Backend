import { Column, PrimaryGeneratedColumn } from 'typeorm';

export abstract class Tag {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;
}