import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from '../users/users.repository';
import { CredentialsDto } from '../users/dto/credentials.dto';
import { CreateUserDto } from 'src/users/dto/createUserdto';

@Injectable()
export class AuthService {
  signUp(createUserDto: CreateUserDto) {
    throw new Error('Method not implemented.');
  }
  constructor(
    private jwtService: JwtService,
    private userRepository: UserRepository,
  ) {}

  async signIn(credentialsDto: CredentialsDto): Promise<{ token: string }> {
    const user = await this.userRepository.checkCredentials(credentialsDto);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { sub: user.id };
    const token = this.jwtService.sign(payload);

    return { token };
  }
}
