import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from './comment.entity';
import { CommentService } from './comment.service';
import { CommentRepository } from './comment.repository';
import { CommentController } from './comment.controller';
import { PostModule } from 'src/post/post.module';
import { PostRepository } from 'src/post/post.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Comment, CommentRepository])],
  controllers: [CommentController],
  providers: [CommentService, CommentRepository],
})
export class CommentModule { }
