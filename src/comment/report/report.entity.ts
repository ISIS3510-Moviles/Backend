import { Comment } from 'src/comment/comment.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Report {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  datetime: Date;

  @Column()
  message: string;

  @Column()
  isOpen: boolean;

  @ManyToOne(() => Comment, (comment) => comment.reports, {
    onDelete: 'CASCADE',
  })
  comment: Comment;
}