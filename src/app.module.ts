import { Module } from '@nestjs/common';
import { DatabaseModule } from './infrastructure/database/database.module';
import { UserController } from './application/controllers/user.controller';
import { ConfigModule } from '@nestjs/config';
import dataSource from './infrastructure/database/data-source';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModel } from './infrastructure/models/user.model';
import { PlantedCropsModel } from './infrastructure/models/planted-crops.model';
import { DashboardDataController } from './application/controllers/dashboard-data.controller';
import { GetDashboardDataUseCase } from './use-cases/get-dashboard-data/get-dashboard-data.use-case';
import { CreateUserUseCase } from './use-cases/create-user/create-user.use-case';
import { GetUserUseCase } from './use-cases/get-user/get-user.use-case';
import { RemoveUserUseCase } from './use-cases/remove-user/remove-user.use-case';
import { UpdateUserUseCase } from './use-cases/update-user/update-user.use-case';
import { ValidateTotalAreaService } from './domain/services/validate-total-area.service';
import { IGetUser } from './interfaces/get-user.use-case.interface';
import { ICreateUser } from './interfaces/create-user.use-case.interface';
import { IRemoveUser } from './interfaces/remove-user.use-case.interface';
import { IUpdateUser } from './interfaces/update-user.use-case.interface';
import { IGetDashBoardData } from './interfaces/get-dashboard-data.use-case.interface';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `${process.cwd()}/.env.${process.env.NODE_ENV || 'development'}`,
      load: [dataSource],
    }),
    DatabaseModule,
    TypeOrmModule.forFeature([UsersModel, PlantedCropsModel]),
  ],
  controllers: [UserController, DashboardDataController],
  providers: [
    {
      provide: IGetUser,
      useClass: GetUserUseCase
    },
    {
      provide: ICreateUser,
      useClass: CreateUserUseCase
    },
    {
      provide: IRemoveUser,
      useClass: RemoveUserUseCase
    },
    {
      provide: IUpdateUser,
      useClass: UpdateUserUseCase
    },
    {
      provide: IGetDashBoardData,
      useClass: GetDashboardDataUseCase
    },
    ValidateTotalAreaService
  ],
})
export class AppModule {}
