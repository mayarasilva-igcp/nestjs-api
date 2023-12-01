import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { UserRepository } from './users.repository';
import { CreateUserDto } from './dto/createUserdto';
import { User } from './users.entity';
import { UserRole } from './enum/user-roles';
import * as bcrypt from 'bcrypt';
import { CredentialsDto } from './dto/credentials.dto';


@Injectable()
export class UsersService {
  checkCredentials(credentialsDto: CredentialsDto) {
    throw new Error('Method not implemented.');
  }
  isEmailUnique(email: string) {
      throw new Error('Method not implemented.');
  }
  findByEmail(email: string) {
      throw new Error('Method not implemented.');
  }
  constructor(private readonly userRepository: UserRepository) { }
  

  async createAdminUser(createUserDto: CreateUserDto): Promise<User> {
    if (createUserDto.password !== createUserDto.passwordConfirmation) {
      throw new UnprocessableEntityException('As senhas não conferem');
    } else {
      const hashedPassword = await this.hashPassword(createUserDto.password);
      const user = await this.userRepository.createUser(
        { ...createUserDto, password: hashedPassword },
        UserRole.ADMIN,
      );
      return user;
    }
  }
  private async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds);
  }
}

