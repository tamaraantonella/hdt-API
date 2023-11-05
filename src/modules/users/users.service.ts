import {
  BadRequestException,
  Injectable,
  NotFoundException
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, UserRole } from './entities/user.entity';
import { ParsedUser } from './types';
import { parseUser, parseUsers } from './utils';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>
  ) {}

  async create(createUserDto: CreateUserDto): Promise<ParsedUser> {
    const foundUser = await this.findByEmail(createUserDto.email);

    if (foundUser) {
      throw new BadRequestException('User already exists');
    }
    const newUser = this.usersRepository.create(createUserDto);
    await this.usersRepository.save(newUser);
    return parseUser(newUser);
  }

  async findAll(): Promise<ParsedUser[]> {
    return parseUsers(await this.usersRepository.find());
  }

  findByEmail(email: string) {
    return this.usersRepository
      .createQueryBuilder('user')
      .select([
        'user.id',
        'user.email',
        'user.firstName',
        'user.phone',
        'user.password',
        'user.role'
      ])
      .where('user.email = :email', { email })
      .andWhere('user.deletedAt IS NULL')
      .andWhere('user.role != :role', { role: UserRole.GHOST })
      .getOne();
  }

  findById(id: string) {
    return this.usersRepository
      .createQueryBuilder('user')
      .select(['user.id', 'user.email', 'user.firstName', 'user.phone'])
      .where('user.id = :id', { id })
      .andWhere('user.deletedAt IS NULL')
      .andWhere('user.role != :role', { role: UserRole.GHOST })
      .getOne();
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const userToUpdate = await this.findById(id);
    if (!userToUpdate) {
      throw new NotFoundException('User not found');
    }
    return this.usersRepository.update(id, updateUserDto);
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
