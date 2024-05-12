import { Injectable } from '@nestjs/common';
import { User } from '../../domain/entities/user/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersModel } from '../../infrastructure/models/user.model';
import { PlantedCropsModel } from '../../infrastructure/models/planted-crops.model';
import { UserNotFoundException } from '../../domain/exceptions/exceptions';
import { IRemoveUser } from '../../interfaces/remove-user.use-case.interface';

@Injectable()
export class RemoveUserUseCase implements IRemoveUser {
  constructor(
    @InjectRepository(UsersModel)
    private userRepository: Repository<UsersModel>,
    @InjectRepository(PlantedCropsModel)
    private plantedCropRepository: Repository<PlantedCropsModel>,
  ) {}

  async delete(id: number): Promise<User> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) throw new UserNotFoundException();

    const removedUser = await this.userRepository.remove(user);
    await this.removeUsersPlantedCrops(id);

    return removedUser;
  }

  async removeUsersPlantedCrops(id: number): Promise<void> {
    const databaseCrops = await this.plantedCropRepository.findBy({
      user_id: id,
    });

    databaseCrops.forEach(async (crop) => {
      await this.plantedCropRepository.remove(crop);
    });
    return;
  }
}
