import { Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/application/dto/create-user.dto';
import { User } from '../../domain/entities/user/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersModel } from '../../infrastructure/models/user.model';
import { cpf } from 'cpf-cnpj-validator';
import { PlantedCropsModel } from '../../infrastructure/models/planted-crops.model';
import { getStateByCod } from 'brazilian-cities';
import {
  CityNotFoundException,
  InvalidCpfOrCnpjException,
  StateNotFoundException,
} from '../../domain/exceptions/exceptions';
import { ValidateTotalAreaService } from '../../domain/services/validate-total-area.service';
import { PlantedCrop } from '../../domain/entities/planted-crops/planted-crops.entity';
import { ICreateUser } from '../../interfaces/create-user.use-case.interface';

@Injectable()
export class CreateUserUseCase implements ICreateUser {
  constructor(
    @InjectRepository(UsersModel)
    private userRepository: Repository<UsersModel>,
    @InjectRepository(PlantedCropsModel)
    private plantedCropRepository: Repository<PlantedCropsModel>,
    private readonly validateTotalAreaService: ValidateTotalAreaService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    createUserDto.state = createUserDto.state.toUpperCase();
    const {
      cpf_or_cnpj,
      total_area,
      vegetation_area,
      arable_area,
      planted_crops,
      city,
      state,
    } = createUserDto;

    this.validateTotalAreaService.execute(
      total_area,
      vegetation_area,
      arable_area,
    );
    this.validateCpfCnpj(cpf_or_cnpj);
    this.validateCityState(city, state);

    const user = await this.userRepository.save(createUserDto);

    const cleanedDuplicateCrops = [...new Set(planted_crops)];
    cleanedDuplicateCrops.forEach((crop) => {
      this.plantedCropRepository.save(new PlantedCrop(user.id, crop));
    });

    return user;
  }

  private validateCityState(city: string, state: string): void {
    const stateFound = getStateByCod(state);
    if (!stateFound) throw new StateNotFoundException();

    const cityFound = stateFound.cities.find(
      (c) => c.label.toUpperCase() === city.toUpperCase(),
    );
    if (!cityFound) throw new CityNotFoundException();
  }

  private validateCpfCnpj(cpf_or_cnpj: string): void {
    if (!cpf.isValid(cpf_or_cnpj) || !cpf.isValid(cpf_or_cnpj))
      throw new InvalidCpfOrCnpjException();
  }
}
