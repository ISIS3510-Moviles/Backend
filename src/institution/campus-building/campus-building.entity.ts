import { Institution } from 'src/institution/institution.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class CampusBuilding {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  shortName: string;

  @Column()
  latitude: number;

  @Column()
  longitude: number;

  @ManyToOne(() => Institution, (institution) => institution.campusBuildings)
  institution: Institution;
}