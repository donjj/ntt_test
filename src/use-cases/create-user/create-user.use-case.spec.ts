import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserUseCase } from './create-user.use-case';
import { CreateUserDto } from '../../application/dto/create-user.dto';
import { User } from '../../domain/entities/user/user.entity';
import { UsersModel } from '../../infrastructure/models/user.model';
import { PlantedCropsModel } from '../../infrastructure/models/planted-crops.model';
import { Repository } from 'typeorm';
import { ValidateTotalAreaService } from '../../domain/services/validate-total-area.service';
import {
  StateNotFoundException,
  CityNotFoundException,
  InvalidCpfOrCnpjException,
} from '../../domain/exceptions/exceptions';
import { getStateByCod } from 'brazilian-cities';
import { PlantedCrops } from '../../domain/enums/valid-planted-crops.enum';

jest.mock('brazilian-cities', () => ({
  getStateByCod: jest.fn(),
}));
const repositoryMockFactory = () => ({
  save: jest.fn(),
});
describe('CreateUserUseCase', () => {
  let useCase: CreateUserUseCase;
  let userRepository: jest.Mocked<Repository<UsersModel>>;
  let plantedCropRepository: Repository<PlantedCropsModel>;
  let validateTotalAreaService: ValidateTotalAreaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateUserUseCase,
        {
          provide: 'UsersModelRepository',
          useFactory: repositoryMockFactory,
        },
        {
          provide: 'PlantedCropsModelRepository',
          useFactory: repositoryMockFactory,
        },
        ValidateTotalAreaService,
      ],
    }).compile();

    useCase = module.get<CreateUserUseCase>(CreateUserUseCase);
    userRepository = module.get('UsersModelRepository');
    plantedCropRepository = module.get('PlantedCropsModelRepository');
    validateTotalAreaService = module.get<ValidateTotalAreaService>(
      ValidateTotalAreaService,
    );
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  describe('create', () => {
    it('should create a user', async () => {
      const createUserDto: CreateUserDto = {
        name: 'paulo',
        email: 'pauloconsoni92@gmail.com',
        cpf_or_cnpj: '688.156.730-83',
        farm_name: 'fazenda das aguas',
        city: 'Curitiba',
        state: 'pr',
        total_area: 15,
        arable_area: 5,
        vegetation_area: 5,
        planted_crops: [PlantedCrops.SOJA],
      };

      const userCreated: UsersModel = {
        name: 'paulo',
        email: 'pauloconsoni92@gmail.com',
        cpf_or_cnpj: '688.156.730-83',
        farm_name: 'fazenda das aguas',
        city: 'Curitiba',
        state: 'pr',
        total_area: 15,
        arable_area: 5,
        vegetation_area: 5,
        id: 1,
      };

      jest.spyOn(validateTotalAreaService, 'execute').mockImplementation();
      jest.spyOn(useCase, 'validateCpfCnpj' as any).mockImplementation();
      jest.spyOn(useCase, 'validateCityState' as any).mockImplementation();

      userRepository.save.mockResolvedValue(userCreated);

      const user: User = await useCase.create(createUserDto);

      expect(user).toBeDefined();
      expect(userRepository.save).toHaveBeenCalled();
      expect(plantedCropRepository.save).toHaveBeenCalled();
    });
  });

  describe('validateCityState', () => {
    it('should throw StateNotFoundException when state is not found', () => {
      const city = 'CityName';
      const state = 'ww';

      (getStateByCod as jest.Mock).mockReturnValue(0);

      expect(() => (useCase as any).validateCityState(city, state)).toThrow(
        StateNotFoundException,
      );
    });

    it('should throw CityNotFoundException when city is not found in state', () => {
      const city = 'InvalidCity';
      const state = 'sp';

      (getStateByCod as jest.Mock).mockReturnValue({ cities: [] });

      expect(() => (useCase as any).validateCityState(city, state)).toThrow(
        CityNotFoundException,
      );
    });
  });

  describe('validateCpfCnpj', () => {
    it('should throw InvalidCpfOrCnpjException when CPF is invalid', () => {
      const invalidCpf = '12345678900';

      expect(() => (useCase as any).validateCpfCnpj(invalidCpf)).toThrow(
        InvalidCpfOrCnpjException,
      );
    });

    it('should throw InvalidCpfOrCnpjException when CNPJ is invalid', () => {
      const invalidCnpj = '12345678901234';

      expect(() => (useCase as any).validateCpfCnpj(invalidCnpj)).toThrow(
        InvalidCpfOrCnpjException,
      );
    });
  });
});
