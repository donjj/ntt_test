import { Inject, Injectable } from '@nestjs/common';
import { User } from '../../domain/entities/user/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersModel } from '../../infrastructure/models/user.model';
import { UpdateUserDto } from '../../application/dto/update-user.dto';
import { PlantedCropsModel } from '../../infrastructure/models/planted-crops.model';
import { UserNotFoundException } from '../../domain/exceptions/exceptions';
import { ValidateTotalAreaService } from '../../domain/services/validate-total-area.service';
import { PlantedCrop } from '../../domain/entities/planted-crops/planted-crops.entity';
import { IUpdateUser } from '../../interfaces/update-user.use-case.interface';
import { IRemoveUser } from '../../interfaces/remove-user.use-case.interface';

@Injectable()
export class UpdateUserUseCase implements IUpdateUser {
  constructor(
    @InjectRepository(UsersModel)
    private userRepository: Repository<UsersModel>,
    @InjectRepository(PlantedCropsModel)
    private plantedCropRepository: Repository<PlantedCropsModel>,
    private readonly validateTotalAreaService: ValidateTotalAreaService,
    @Inject(IRemoveUser)
    private readonly removeUser: IRemoveUser,
  ) {}

  async update(updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.userRepository.findOneBy({ id: updateUserDto.id });
    if (!user) throw new UserNotFoundException();

    const total_area = updateUserDto.total_area || user.total_area;
    const vegetation_area =
      updateUserDto.vegetation_area || user.vegetation_area;
    const arable_area = updateUserDto.arable_area || user.arable_area;
    this.validateTotalAreaService.execute(
      total_area,
      vegetation_area,
      arable_area,
    );

    const savedUser = await this.userRepository.save({
      ...user,
      ...updateUserDto,
    });

    if (updateUserDto.planted_crops) {
      await this.removeUser.removeUsersPlantedCrops(user.id);

      const cleanedDuplicateCrops = [...new Set(updateUserDto.planted_crops)];
      cleanedDuplicateCrops.forEach((crop) => {
        this.plantedCropRepository.save(new PlantedCrop(user.id, crop));
      });
    }

    return savedUser;
  }
}
