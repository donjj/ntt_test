import { Test, TestingModule } from '@nestjs/testing';
import { GetUserUseCase } from './get-user.use-case';
import { User } from '../../domain/entities/user/user.entity';
import { UsersModel } from '../../infrastructure/models/user.model';
import { Repository } from 'typeorm';

describe('GetUserUseCase', () => {
  let useCase: GetUserUseCase;
  let userRepository: Repository<UsersModel>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetUserUseCase,
        {
          provide: 'UsersModelRepository',
          useClass: Repository,
        },
      ],
    }).compile();

    useCase = module.get<GetUserUseCase>(GetUserUseCase);
    userRepository = module.get<Repository<UsersModel>>('UsersModelRepository');
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const users: User[] = [];

      jest.spyOn(userRepository, 'find').mockResolvedValue(users);

      const result: User[] = await useCase.findAll();

      expect(result).toEqual(users);
    });
  });

  describe('findOne', () => {
    it('should return a user by id', async () => {
      const userId = 1;
      const user: User = {
        id: userId,
        arable_area: 5,
        city: 'curitiba',
        cpf_or_cnpj: '688.156.730-83',
        email: 'pauloconsoni92@gmail.com',
        farm_name: 'stardew valley',
        name: 'paulo',
        state: 'pr',
        total_area: 10,
        vegetation_area: 5,
      };

      jest.spyOn(userRepository, 'findOneBy').mockResolvedValue(user);

      const result: User | undefined = await useCase.findOne(userId);

      expect(result).toEqual(user);
    });

    it('should return undefined if user is not found', async () => {
      const userId = 999;

      jest.spyOn(userRepository, 'findOneBy').mockResolvedValue(undefined);

      const result: User | undefined = await useCase.findOne(userId);

      expect(result).toBeUndefined();
    });
  });
});
