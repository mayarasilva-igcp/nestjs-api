import { CommentDTO } from './comment.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CommentRepository } from './comment.repository';
import { Comment } from './comment.entity';
import { FindManyOptions } from 'typeorm';

@Injectable()
export class CommentService {
    constructor(private readonly commentRepository: CommentRepository) { }

    async findCommentsByPostId(postId: number): Promise<Comment[]> {
        const comments = await this.commentRepository.findByPostId(postId)

        if (!comments || comments.length == 0) {
            throw new NotFoundException('Comments not found for the specified post');
        }

        return comments;
    }


    async createNewComment(commentDTO: CommentDTO): Promise<void> {
     const comment = await this.commentRepository.createComment(commentDTO)
     console.log(comment)
    }
}
