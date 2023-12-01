
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from 'src/users/users.entity'
import { Post } from '../post/post.entity';

@Entity()
export class Comment {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    typeComment: string;

    @Column()
    numberOfLikes: number;


    @ManyToOne(() => User, (user) => user.comments,)
    user: User;

    @ManyToOne(() => Post, (post) => post.comments,)
    post: Post;
    static post: any;

    postId: number;
}
