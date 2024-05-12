import { UpdateUserDto } from 'src/application/dto/update-user.dto';
import { User } from 'src/domain/entities/user/user.entity';

export interface IUpdateUser {
  update(updateUserDto: UpdateUserDto): Promise<User>;
}

export const IUpdateUser = Symbol('IUpdateUser');
