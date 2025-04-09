
import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Controller('comment')
export class CommentController {
  constructor(private commentService: CommentService) {}

  @Post()
  createComment(@Body() createCommentDto: CreateCommentDto) {
    return this.commentService.createComment(createCommentDto);
  }

  @Get()
  getComments(@Query('restaurantId') restaurantId?: string) {
    if (restaurantId) {
      return this.commentService.getCommentsByRestaurantId(restaurantId);
    }
  }


  @Get(':id')
  getCommentById(@Param('id') id: string) {
    return this.commentService.getCommentById(id);
  }

  @Delete(':id')
  deleteCommentById(@Param('id') id: string) {
    return this.commentService.deleteComment(id);
  }

  @Patch(':id')
  updateCommentById(
    @Param('id') id: string,
    @Body() updateCommentDto: UpdateCommentDto,
  ) {
    return this.commentService.updateComment(id, updateCommentDto);
  }
}
