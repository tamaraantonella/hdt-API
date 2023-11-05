import {
  BadRequestException,
  Injectable,
  UnauthorizedException
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';
import { UsersService } from 'modules/users/users.service';
import { hashPassword, isPasswordValid } from './utils';
import { LoginDto } from './dto/login.dto';
import { JWTPayload } from './types';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private usersService: UsersService
  ) {}

  async register({ email, password, ...registerData }: RegisterDto) {
    const user = await this.usersService.findByEmail(email);
    if (user) {
      throw new BadRequestException('User already exists');
    }
    const hashedPassword = await hashPassword(password);

    return this.usersService.create({
      ...registerData,
      email,
      password: hashedPassword
    });
  }

  async login({ email, password }: LoginDto) {
    const user = await this.usersService.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Invalid email');
    }
    const { password: userPassword, ...userData } = user;

    const validPassword = isPasswordValid(
      password,
      userPassword
    );

    if (!validPassword) {
      throw new UnauthorizedException('Invalid password');
    }

    const payload: JWTPayload = {
      id: user.id,
      email: user.email,
      role: user.role,
      firstName: user.firstName
    };

    const token = await this.jwtService.signAsync(payload);

    return {
      token,
      userData
    };
  }

  async getMyProfile(id: string) {
    return this.usersService.findById(id);
  }
}
