import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PostRepository } from './post.repository';
import { Post } from './post.entity';

@Injectable()
export class PostService {
  constructor(
    private readonly postRepository: PostRepository,
  ) {}

  async findAll(): Promise<Post[]> {
    return this.postRepository.find();
  }

  findCommentsByPostId = async (postId: number): Promise<Post | null> => {
    const post = await this.postRepository.findCommentsByPostId(postId);

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    return post;
  }

  async findPostsByUserId(userId: number): Promise<Post[]> {
    const posts = await this.postRepository.findPostsByUserId(userId);

    if (!posts || posts.length === 0) {
      throw new NotFoundException('No posts found for the user');
    }

    return posts;
  }
}
