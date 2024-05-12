import { Test, TestingModule } from '@nestjs/testing';
import { DashboardDataController } from './dashboard-data.controller';
import { IGetDashBoardData } from '../../interfaces/get-dashboard-data.use-case.interface';
import { DashboardData } from '../../domain/entities/dashboard-data/dashboard-data.entity';

describe('DashboardDataController', () => {
  let controller: DashboardDataController;
  let getDashboardData: IGetDashBoardData;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DashboardDataController],
      providers: [
        {
          provide: IGetDashBoardData,
          useValue: {
            getAll: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<DashboardDataController>(DashboardDataController);
    getDashboardData = module.get<IGetDashBoardData>(IGetDashBoardData);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return dashboard data', async () => {
      const dashboardData: DashboardData = {
        total_farms: 10,
        total_in_hectares: 30,
        usage_solo_percent: 90,
        total_per_crops: {},
        total_per_states: {},
      };

      jest.spyOn(getDashboardData, 'getAll').mockResolvedValue(dashboardData);

      const result: DashboardData = await controller.findAll();

      expect(result).toBe(dashboardData);
    });
  });
});
