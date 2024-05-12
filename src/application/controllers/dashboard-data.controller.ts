import { Controller, Get, Inject } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { DashboardData } from '../../domain/entities/dashboard-data/dashboard-data.entity';
import { IGetDashBoardData } from '../../interfaces/get-dashboard-data.use-case.interface';

@Controller('dashboard')
@ApiTags('Dashboard')
export class DashboardDataController {
  constructor(
    @Inject(IGetDashBoardData)
    private readonly getDashboardData: IGetDashBoardData,
  ) {}

  @Get()
  async findAll(): Promise<DashboardData> {
    return await this.getDashboardData.getAll();
  }
}
