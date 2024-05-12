import { DashboardData } from '../domain/entities/dashboard-data/dashboard-data.entity';

export interface IGetDashBoardData {
  getAll(): Promise<DashboardData>;
}

export const IGetDashBoardData = Symbol('IGetDashBoardData');
