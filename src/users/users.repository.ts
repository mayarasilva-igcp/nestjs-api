import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users.entity';
import { CreateUserDto } from './dto/createUserdto';
import { UserRole } from './enum/user-roles';
import { Injectable } from '@nestjs/common';
import { CredentialsDto } from './dto/credentials.dto';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';

@Injectable()
export class UserRepository {
  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) { }

  async createUser(createUserDto: CreateUserDto, role: UserRole): Promise<User> {
    const { name, email, password } = createUserDto;

    const newUser = this.userRepository.create({
      birthday: new Date(),
      confirmationToken: crypto.randomBytes(32).toString('hex'),
      email,
      hashPassword: await this.hashPassword(password),
      name,
      status: true,
      role,

    });

    const savedUser = await this.userRepository.save(newUser);


    const { hashPassword, ...userWithoutSensitiveInfo } = savedUser;

    return userWithoutSensitiveInfo as User;
  }

  async checkCredentials(credentialsDto: CredentialsDto): Promise<User> {
    const { email, password } = credentialsDto;
    const user = await this.userRepository.findOne({ where: { email, status: true } });

    if (user && (await user.checkPassword(password))) {
      return user;
    } else {
      return null;
    }
  }

  private async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds);
  }

  async findById(userId: number): Promise<User> {
    return await this.userRepository.findOne({ where: { id: userId } });
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return await this.userRepository.findOne({ where: { email } });
  } 
}
