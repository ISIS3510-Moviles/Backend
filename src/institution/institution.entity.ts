import { CampusBuilding } from 'src/institution/campus-building/campus-building.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class Institution {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @OneToMany(
    () => CampusBuilding,
    (campusBuilding) => campusBuilding.institution,
  )
  campusBuildings: CampusBuilding[];
}