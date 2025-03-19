import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from './comment.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private commentRepository: Repository<Comment>,
  ) {}

  createComment(comment: CreateCommentDto): Promise<Comment> {
    const newComment = this.commentRepository.create(comment);
    return this.commentRepository.save(newComment);
  }

  getComments(): Promise<Comment[]> {
    return this.commentRepository.find();
  }

  getCommentById(id: number): Promise<Comment | null> {
    return this.commentRepository.findOne({ where: { id } });
  }

  deleteComment(id: number): Promise<DeleteResult> {
    return this.commentRepository.delete({ id });
  }

  updateComment(id: number, comment: UpdateCommentDto): Promise<UpdateResult> {
    return this.commentRepository.update({ id }, comment);
  }
}
