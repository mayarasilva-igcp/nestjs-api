import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './post.entity';

@Injectable()
export class PostRepository {
  find(): Post[] | PromiseLike<Post[]> {
    throw new Error('Method not implemented.');
  }
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
  ) {}

  async findCommentsByPostId(postId: number): Promise<Post | null> {
    const post = await this.postRepository
      .createQueryBuilder('post')
      .leftJoinAndSelect('post.comments', 'comment')
      .where('post.id = :postId', { postId })
      .getOne();

    return post || null;
  }

  async findPostsByUserId(userId: number): Promise<Post[]> {
    return this.postRepository
      .createQueryBuilder('post')
      .where('post.userId = :userId', { userId })
      .getMany();
  }
}
