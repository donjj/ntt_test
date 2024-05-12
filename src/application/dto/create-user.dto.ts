import {
  IsNotEmpty,
  IsString,
  IsEmail,
  IsNumber,
  Length,
  IsEnum,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ExceptionsEnum } from '../../domain/enums/exceptions.enum';
import { PlantedCrops } from '../../domain/enums/valid-planted-crops.enum';

export class CreateUserDto {
  @ApiProperty({ example: 'Paulo Consoni' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'pauloconsoni@gmail.com' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: '688.156.730-83' })
  @IsString()
  @IsNotEmpty()
  cpf_or_cnpj: string;

  @ApiProperty({ example: 'fazenda do paulo' })
  @IsString()
  @IsNotEmpty()
  farm_name: string;

  @ApiProperty({ example: 'Curitiba' })
  @IsString()
  @IsNotEmpty()
  city: string;

  @ApiProperty({ example: 'PR' })
  @IsString()
  @IsNotEmpty()
  @Length(2, 2, { message: ExceptionsEnum.InvalidAcronymState })
  state: string;

  @ApiProperty({ example: 15 })
  @IsNumber()
  @IsNotEmpty()
  total_area: number;

  @ApiProperty({ example: 5 })
  @IsNumber()
  @IsNotEmpty()
  vegetation_area: number;

  @ApiProperty({ example: 5 })
  @IsNumber()
  @IsNotEmpty()
  arable_area: number;

  @ApiProperty({ example: ['soja', 'milho'] })
  @IsEnum(PlantedCrops, { each: true })
  @IsNotEmpty()
  planted_crops: PlantedCrops[];
}
