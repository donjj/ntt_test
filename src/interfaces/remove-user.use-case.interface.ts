import { User } from 'src/domain/entities/user/user.entity';

export interface IRemoveUser {
  delete(id: number): Promise<User>;
  removeUsersPlantedCrops(id: number): Promise<void>;
}

export const IRemoveUser = Symbol('IRemoveUser');
