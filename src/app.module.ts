import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './configs/typeorm.config';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { PostModule } from './post/post.module';
import { PostRepository } from './post/post.repository';
import { CommentModule } from './comment/comment.module';
import { CommentRepository } from './comment/comment.repository';
import { CommentService } from './comment/comment.service';


@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), CommentModule, UsersModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
