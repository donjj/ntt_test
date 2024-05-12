import { CreateUserDto } from 'src/application/dto/create-user.dto';
import { User } from 'src/domain/entities/user/user.entity';

export interface ICreateUser {
  create(createUserDto: CreateUserDto): Promise<User>;
}

export const ICreateUser = Symbol('ICreateUser');
