import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { User } from 'src/domain/entities/user/user.entity';
import { ApiTags } from '@nestjs/swagger';
import { UpdateUserDto } from '../dto/update-user.dto';
import { IGetUser } from '../../interfaces/get-user.use-case.interface';
import { ICreateUser } from '../../interfaces/create-user.use-case.interface';
import { IRemoveUser } from '../../interfaces/remove-user.use-case.interface';
import { IUpdateUser } from '../../interfaces/update-user.use-case.interface';

@Controller('users')
@ApiTags('Users')
export class UserController {
  constructor(
    @Inject(ICreateUser)
    private readonly createUser: ICreateUser,
    @Inject(IGetUser)
    private readonly getUser: IGetUser,
    @Inject(IRemoveUser)
    private readonly removeUser: IRemoveUser,
    @Inject(IUpdateUser)
    private readonly updateUser: IUpdateUser,
  ) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return await this.createUser.create(createUserDto);
  }

  @Get()
  async findAll(): Promise<User[]> {
    return await this.getUser.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<User> {
    const user = await this.getUser.findOne(id);
    return user;
  }

  @Patch()
  async update(@Body() updateUserDto: UpdateUserDto): Promise<User> {
    return await this.updateUser.update(updateUserDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<User> {
    const user = await this.removeUser.delete(id);
    return user;
  }
}
