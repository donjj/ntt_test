import { User } from 'src/domain/entities/user/user.entity';

export interface IGetUser {
  findAll(): Promise<User[]>;
  findOne(id: number): Promise<User>;
}

export const IGetUser = Symbol('IGetUser');
