import { Test, TestingModule } from '@nestjs/testing';
import { RemoveUserUseCase } from './remove-user.use-case';
import { UsersModel } from '../../infrastructure/models/user.model';
import { PlantedCropsModel } from '../../infrastructure/models/planted-crops.model';
import { Repository } from 'typeorm';
import { UserNotFoundException } from '../../domain/exceptions/exceptions';
import { PlantedCrops } from '../../domain/enums/valid-planted-crops.enum';

const repositoryMockFactory = () => ({
  findBy: jest.fn(),
  remove: jest.fn(),
});
describe('RemoveUserUseCase', () => {
  let useCase: RemoveUserUseCase;
  let userRepository: Repository<UsersModel>;
  let plantedCropRepository: Repository<PlantedCropsModel>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RemoveUserUseCase,
        {
          provide: 'UsersModelRepository',
          useClass: Repository,
        },
        {
          provide: 'PlantedCropsModelRepository',
          useFactory: repositoryMockFactory,
        },
      ],
    }).compile();

    useCase = module.get<RemoveUserUseCase>(RemoveUserUseCase);
    userRepository = module.get<Repository<UsersModel>>('UsersModelRepository');
    plantedCropRepository = module.get('PlantedCropsModelRepository');
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  describe('delete', () => {
    it('should delete a user and associated planted crops', async () => {
      const userId = 1;
      const user = {
        id: userId,
      };

      jest.spyOn(userRepository, 'findOneBy').mockResolvedValue(user as any);
      jest.spyOn(userRepository, 'remove').mockResolvedValue(user as any);
      jest
        .spyOn(plantedCropRepository, 'findBy')
        .mockResolvedValue([{ id: 1, name: PlantedCrops.SOJA, user_id: 1 }]);
      jest.spyOn(plantedCropRepository, 'remove').mockResolvedValue(undefined);

      const result = await useCase.delete(userId);

      expect(result).toEqual(user);
      expect(userRepository.remove).toHaveBeenCalledWith(user);
      expect(plantedCropRepository.remove).toHaveBeenCalled();
    });

    it('should throw UserNotFoundException when user is not found', async () => {
      const userId = 999;

      jest.spyOn(userRepository, 'findOneBy').mockResolvedValue(undefined);

      await expect(useCase.delete(userId)).rejects.toThrow(
        UserNotFoundException,
      );
    });
  });

  describe('removeUsersPlantedCrops', () => {
    it('should remove all planted crops associated with the user', async () => {
      const userId = 1;
      const crops = [{ id: 1, name: PlantedCrops.SOJA, user_id: 1 }];

      jest
        .spyOn(plantedCropRepository, 'findBy')
        .mockResolvedValue(crops as any);
      jest.spyOn(plantedCropRepository, 'remove').mockResolvedValue(undefined);

      await useCase.removeUsersPlantedCrops(userId);

      expect(plantedCropRepository.remove).toHaveBeenCalledWith(crops[0]);
    });
  });
});
