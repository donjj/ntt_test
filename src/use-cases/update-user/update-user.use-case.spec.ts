import { Test, TestingModule } from '@nestjs/testing';
import { UpdateUserUseCase } from './update-user.use-case';
import { UpdateUserDto } from '../../application/dto/update-user.dto';
import { User } from '../../domain/entities/user/user.entity';
import { UsersModel } from '../../infrastructure/models/user.model';
import { PlantedCropsModel } from '../../infrastructure/models/planted-crops.model';
import { Repository } from 'typeorm';
import { ValidateTotalAreaService } from '../../domain/services/validate-total-area.service';
import { UserNotFoundException } from '../../domain/exceptions/exceptions';
import { IRemoveUser } from '../../interfaces/remove-user.use-case.interface';
import { PlantedCrops } from '../../domain/enums/valid-planted-crops.enum';

const repositoryMockFactory = () => ({
  save: jest.fn(),
  findOneBy: jest.fn(),
});
describe('UpdateUserUseCase', () => {
  let useCase: UpdateUserUseCase;
  let userRepository: jest.Mocked<Repository<UsersModel>>;
  let plantedCropRepository: Repository<PlantedCropsModel>;
  let validateTotalAreaService: ValidateTotalAreaService;
  let removeUser: IRemoveUser;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UpdateUserUseCase,
        {
          provide: 'UsersModelRepository',
          useFactory: repositoryMockFactory,
        },
        {
          provide: 'PlantedCropsModelRepository',
          useClass: Repository,
        },
        ValidateTotalAreaService,
        {
          provide: IRemoveUser,
          useValue: {
            removeUsersPlantedCrops: jest.fn(),
          },
        },
      ],
    }).compile();

    useCase = module.get<UpdateUserUseCase>(UpdateUserUseCase);
    userRepository = module.get('UsersModelRepository');
    plantedCropRepository = module.get<Repository<PlantedCropsModel>>(
      'PlantedCropsModelRepository',
    );
    validateTotalAreaService = module.get<ValidateTotalAreaService>(
      ValidateTotalAreaService,
    );
    removeUser = module.get<IRemoveUser>(IRemoveUser);
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  describe('update', () => {
    it('should update a user', async () => {
      const updateUserDto: UpdateUserDto = {
        id: 1,
        arable_area: 5,
        email: 'paulo@gmail.com',
        farm_name: 'farmville',
        planted_crops: [PlantedCrops.SOJA],
        total_area: 10,
        vegetation_area: 5,
      };
      const existingUser: User = {
        id: 1,
        name: 'paulo',
        email: 'pauloconsoni92@gmail.com',
        cpf_or_cnpj: '688.156.730-83',
        farm_name: 'fazenda das aguas',
        city: 'Curitiba',
        state: 'pr',
        total_area: 15,
        arable_area: 5,
        vegetation_area: 5,
      };

      jest.spyOn(userRepository, 'findOneBy').mockResolvedValue(existingUser);
      jest.spyOn(validateTotalAreaService, 'execute').mockImplementation();
      jest.spyOn(userRepository, 'save').mockImplementation();
      jest
        .spyOn(removeUser, 'removeUsersPlantedCrops')
        .mockResolvedValue(undefined);
      jest.spyOn(plantedCropRepository, 'save').mockImplementation();

      userRepository.save.mockResolvedValue(existingUser);

      const updatedUser: User = await useCase.update(updateUserDto);

      expect(updatedUser).toBeDefined();
      expect(userRepository.save).toHaveBeenCalled();
    });

    it('should throw UserNotFoundException when user is not found', async () => {
      const updateUserDto: UpdateUserDto = {
        id: 999,
        arable_area: 5,
        email: 'paulo@gmail.com',
        farm_name: 'farmville',
        planted_crops: [PlantedCrops.SOJA],
        total_area: 10,
        vegetation_area: 5,
      };

      jest.spyOn(userRepository, 'findOneBy').mockResolvedValue(undefined);

      await expect(useCase.update(updateUserDto)).rejects.toThrow(
        UserNotFoundException,
      );
    });
  });
});
