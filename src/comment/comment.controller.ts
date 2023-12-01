import { CommentDTO } from './comment.dto';
import { CommentService } from './comment.service';
import { Body, Controller, Get, Param, Post } from "@nestjs/common";

@Controller()
export class CommentController {
    constructor(private readonly commentService: CommentService) { }

    @Get(':postId/comments')
    async getCommentsByPostId(@Param('postId') postId: number) {
        return await this.commentService.findCommentsByPostId(postId);
    }

    @Post("/comment")
    async createCommentPost(@Body() commentDTO: CommentDTO): Promise<void> {
        await this.commentService.createNewComment(commentDTO)
    }
}
