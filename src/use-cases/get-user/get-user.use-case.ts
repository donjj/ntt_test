import { Injectable } from '@nestjs/common';
import { User } from '../../domain/entities/user/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersModel } from '../../infrastructure/models/user.model';
import { IGetUser } from '../../interfaces/get-user.use-case.interface';

@Injectable()
export class GetUserUseCase implements IGetUser {
  constructor(
    @InjectRepository(UsersModel)
    private userRepository: Repository<UsersModel>,
  ) {}

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findOne(id: number): Promise<User> | undefined {
    return await this.userRepository.findOneBy({ id });
  }
}
