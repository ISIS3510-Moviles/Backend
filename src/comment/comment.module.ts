import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from 'src/comment/comment.entity';
import { Report } from 'src/comment/report/report.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Comment, Report])],
  controllers: [],
  providers: [],
})
export class CommentModule {}