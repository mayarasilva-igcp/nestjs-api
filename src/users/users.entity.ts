import { Entity, PrimaryGeneratedColumn, Column, OneToMany, Unique } from 'typeorm';
import { Post } from '../post/post.entity';
import { Comment } from '../comment/comment.entity';
import * as bcrypt from 'bcrypt';

@Entity()
@Unique(['email'])
export class User {
  save() {
    throw new Error('Method not implemented.');
  }
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column({ type: 'date' })
  birthday: Date;

  @Column()
  hashPassword: string;

  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];

  @OneToMany(() => Comment, (Comment) => Comment.user)
  comments: Comment[];
  confirmationToken: string;
  role: import("c:/Users/mayara.silva.IGCLAN/nestjs-api/src/users/enum/user-roles").UserRole;
  status: boolean;
  salt: any;
  password: string;
  async checkPassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt);
    return hash === this.password;
}
}