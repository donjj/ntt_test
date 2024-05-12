import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PlantedCropsModel } from '../../infrastructure/models/planted-crops.model';
import { PlantedCrops } from '../../domain/enums/valid-planted-crops.enum';
import { UsersModel } from '../../infrastructure/models/user.model';
import { DashboardData } from '../../domain/entities/dashboard-data/dashboard-data.entity';
import { IGetDashBoardData } from '../../interfaces/get-dashboard-data.use-case.interface';

@Injectable()
export class GetDashboardDataUseCase implements IGetDashBoardData {
  constructor(
    @InjectRepository(UsersModel)
    private userRepository: Repository<UsersModel>,
    @InjectRepository(PlantedCropsModel)
    private plantedCropRepository: Repository<PlantedCropsModel>,
  ) {}

  async getAll(): Promise<DashboardData> {
    const all_farms = await this.userRepository.find();
    let total_usable_area = 0;

    const total_farms = all_farms.length;
    let total_in_hectares = 0;
    let usage_solo_percent = 0;
    const total_per_states = {};
    const total_per_crops = {};

    all_farms.forEach((farm) => {
      total_in_hectares += farm.total_area;
      total_per_states[farm.state] = (total_per_states[farm.state] || 0) + 1;
      total_usable_area += farm.arable_area + farm.vegetation_area;
    });

    total_usable_area = (total_usable_area / total_in_hectares) * 100;
    usage_solo_percent = Math.round(total_usable_area);

    for (let crop in PlantedCrops) {
      const cropsFound = await this.plantedCropRepository.findBy({
        name: PlantedCrops[crop],
      });
      if (cropsFound && cropsFound.length)
        total_per_crops[PlantedCrops[crop]] = cropsFound.length;
    }

    return new DashboardData(
      total_farms,
      total_in_hectares,
      usage_solo_percent,
      total_per_states,
      total_per_crops,
    );
  }
}
