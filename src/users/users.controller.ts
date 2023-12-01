import { Controller, Post, Body, ValidationPipe, ConflictException } from '@nestjs/common';
import { CreateUserDto } from './dto/createUserdto';
import { UsersService } from './users.service';
import { ReturnUserDto } from './dto/return-user.dto';
import { Public } from './decorator/public.decorator';
import { QueryFailedError } from 'typeorm';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post("/users")
  @Public()
  async createAdminUser(
    @Body(ValidationPipe) createUserDto: CreateUserDto,
  ): Promise<ReturnUserDto> {
    try {
      const user = await this.usersService.createAdminUser(createUserDto);
      return {
        user,
        message: 'Usuário cadastrado com sucesso',
      };
    } catch (error) {

      if (error instanceof QueryFailedError && error.message.includes('duplicate key')) {
        throw new ConflictException('Usuário já existe');
      }
      throw error;
    }
  }
}
