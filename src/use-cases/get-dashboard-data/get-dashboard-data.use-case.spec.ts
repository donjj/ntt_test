import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { GetDashboardDataUseCase } from './get-dashboard-data.use-case';
import { PlantedCropsModel } from '../../infrastructure/models/planted-crops.model';
import { UsersModel } from 'src/infrastructure/models/user.model';
import { DashboardData } from 'src/domain/entities/dashboard-data/dashboard-data.entity';

const repositoryMockFactory = () => ({
  find: jest.fn(),
  findBy: jest.fn(),
});

describe('GetDashboardDataService', () => {
  let useCase: GetDashboardDataUseCase;
  let repositoryUserMock: jest.Mocked<Repository<UsersModel>>;
  let repositoryCropsMock: jest.Mocked<Repository<PlantedCropsModel>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetDashboardDataUseCase,
        {
          provide: 'UsersModelRepository',
          useFactory: repositoryMockFactory,
        },
        {
          provide: 'PlantedCropsModelRepository',
          useFactory: repositoryMockFactory,
        },
      ],
    }).compile();

    useCase = module.get<GetDashboardDataUseCase>(GetDashboardDataUseCase);
    repositoryUserMock = module.get('UsersModelRepository');
    repositoryCropsMock = module.get('PlantedCropsModelRepository');
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  describe('getAll', () => {
    it('should return dashboard data', async () => {
      const farms = [
        {
          total_area: 10,
          state: 'pr',
          arable_area: 5,
          vegetation_area: 3,
          id: 1,
          name: 'paulo',
          cpf_or_cnpj: '688.156.730-83',
          city: 'Curitiba',
          email: 'paulo@gmail.com',
          farm_name: 'minha fazenda',
        },
      ];
      const crops = [{ name: 'soja', user_id: 1, id: 1 }];

      repositoryUserMock.find.mockResolvedValue(farms);
      repositoryCropsMock.findBy.mockResolvedValueOnce(crops);

      const result: DashboardData = await useCase.getAll();

      expect(result.total_farms).toBe(1);
      expect(result.total_in_hectares).toBe(10);
      expect(result.total_per_states).toEqual({ pr: 1 });
      expect(result.usage_solo_percent).toBe(80);
      expect(result.total_per_crops).toEqual({ soja: 1 });
    });
  });
});
