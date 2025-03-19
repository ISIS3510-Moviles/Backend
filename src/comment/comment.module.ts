import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from 'src/comment/comment.entity';
import { Report } from 'src/comment/report/report.entity';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Comment, Report])],
  controllers: [CommentController],
  providers: [CommentService],
})
export class CommentModule {}