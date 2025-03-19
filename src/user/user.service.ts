import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  createUser(user: CreateUserDto): Promise<User> {
    const newUser = this.userRepository.create(user);
    return this.userRepository.save(newUser);
  }

  getUsers(): Promise<User[]> {
    return this.userRepository.find();
  }

  getUserById(identification: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { identification } });
  }

  deleteUser(identification: string): Promise<DeleteResult> {
    return this.userRepository.delete({ identification });
  }

  updateUser(
    identification: string,
    user: UpdateUserDto,
  ): Promise<UpdateResult> {
    return this.userRepository.update({ identification }, user);
  }
}
