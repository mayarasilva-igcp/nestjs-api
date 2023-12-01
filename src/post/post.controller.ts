import { CommentService } from './../comment/comment.service';
import { Comment } from './../comment/comment.entity';
import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { PostService } from './post.service';
import { AuthGuard } from '@nestjs/passport';

@Controller()
export class PostController {
  constructor(private readonly postService: PostService) { }

  @Get('user/:userId')
  @UseGuards(AuthGuard())
  getUserPosts(@Param('userId') userId: number) {
    return this.postService.findPostsByUserId(userId);
  }
}
