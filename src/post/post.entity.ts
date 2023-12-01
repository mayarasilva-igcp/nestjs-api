import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { User } from 'src/users/users.entity';
import { Comment } from 'src/comment/comment.entity';

@Entity()
export class Post {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'bytea', nullable: true })
    photo: Buffer;

    @Column()
    title: string;

    @ManyToOne(() => User, (user) => user.posts,)
    user: User;

    @Column()
    numberOfLikes: number;

    @Column()
    numberOfShares: number;

    @OneToMany(() => Comment, (Comment) => Comment.post,)
    comments: Comment[];
}