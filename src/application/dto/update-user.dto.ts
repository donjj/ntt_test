import {
  IsNotEmpty,
  IsString,
  IsEmail,
  IsNumber,
  IsOptional,
  IsEnum,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { PlantedCrops } from '../../domain/enums/valid-planted-crops.enum';

export class UpdateUserDto {
  @ApiProperty({ example: 1 })
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @ApiProperty({ example: 'pauloconsoni92@gmail.com' })
  @IsOptional()
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'fazendinha do paulo' })
  @IsOptional()
  @IsString()
  farm_name: string;

  @ApiProperty({ example: 25 })
  @IsOptional()
  @IsNumber()
  total_area: number;

  @ApiProperty({ example: 15 })
  @IsOptional()
  @IsNumber()
  vegetation_area: number;

  @ApiProperty({ example: 10 })
  @IsOptional()
  @IsNumber()
  arable_area: number;

  @ApiProperty({ example: ['algodão'] })
  @IsEnum(PlantedCrops, { each: true })
  @IsNotEmpty()
  planted_crops: PlantedCrops[];
}
