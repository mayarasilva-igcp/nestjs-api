import { CommentDTO } from './comment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Comment } from './comment.entity';

@Injectable()
export class CommentRepository {
  constructor(@InjectRepository(Comment) private readonly commentRepository: Repository<Comment>) { }

  async findByPostId(postId: number): Promise<Comment[]> {
    return await this.commentRepository.find({
      where: { post: { id: postId } }
    })
  }

  async createComment(commentDTO: CommentDTO): Promise<void> {
    const newComment = await this.commentRepository.create(commentDTO)
    await this.commentRepository.save(newComment)
  }

}
