import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { CreateUserDto } from '../dto/create-user.dto';
import { User } from '../../domain/entities/user/user.entity';
import { UpdateUserDto } from '../dto/update-user.dto';
import { IGetUser } from '../../interfaces/get-user.use-case.interface';
import { ICreateUser } from '../../interfaces/create-user.use-case.interface';
import { IRemoveUser } from '../../interfaces/remove-user.use-case.interface';
import { IUpdateUser } from '../../interfaces/update-user.use-case.interface';
import { PlantedCrops } from '../../domain/enums/valid-planted-crops.enum';

describe('UserController', () => {
  let controller: UserController;
  let createUser: ICreateUser;
  let getUser: IGetUser;
  let removeUser: IRemoveUser;
  let updateUser: IUpdateUser;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: ICreateUser,
          useValue: {
            create: jest.fn(),
          },
        },
        {
          provide: IGetUser,
          useValue: {
            findAll: jest.fn(),
            findOne: jest.fn(),
          },
        },
        {
          provide: IRemoveUser,
          useValue: {
            delete: jest.fn(),
          },
        },
        {
          provide: IUpdateUser,
          useValue: {
            update: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
    createUser = module.get<ICreateUser>(ICreateUser);
    getUser = module.get<IGetUser>(IGetUser);
    removeUser = module.get<IRemoveUser>(IRemoveUser);
    updateUser = module.get<IUpdateUser>(IUpdateUser);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a user', async () => {
      const createUserDto: CreateUserDto = {
        arable_area: 10,
        city: 'curitiba',
        cpf_or_cnpj: '688.156.730-83',
        email: 'paulo@consoni.com',
        farm_name: 'farmville',
        name: 'paulo',
        planted_crops: [PlantedCrops.ALGODAO],
        state: 'pr',
        total_area: 30,
        vegetation_area: 9,
      };
      const createdUser: User = {
        arable_area: 10,
        city: 'curitiba',
        cpf_or_cnpj: '688.156.730-83',
        email: 'paulo@consoni.com',
        farm_name: 'farmville',
        id: 1,
        name: 'paulo',
        state: 'pr',
        total_area: 30,
        vegetation_area: 9,
      };

      jest.spyOn(createUser, 'create').mockResolvedValue(createdUser);

      const result: User = await controller.create(createUserDto);

      expect(result).toBe(createdUser);
    });
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const users: User[] = [];

      jest.spyOn(getUser, 'findAll').mockResolvedValue(users);

      const result: User[] = await controller.findAll();

      expect(result).toBe(users);
    });
  });

  describe('findOne', () => {
    it('should return a user by id', async () => {
      const userId = 1;
      const user: User = {
        arable_area: 10,
        city: 'curitiba',
        cpf_or_cnpj: '688.156.730-83',
        email: 'paulo@consoni.com',
        farm_name: 'farmville',
        id: 1,
        name: 'paulo',
        state: 'pr',
        total_area: 30,
        vegetation_area: 9,
      };

      jest.spyOn(getUser, 'findOne').mockResolvedValue(user);

      const result: User = await controller.findOne(userId);

      expect(result).toBe(user);
    });
  });

  describe('update', () => {
    it('should update a user', async () => {
      const updateUserDto: UpdateUserDto = {
        arable_area: 31,
        email: 'asdasddsa@gmail.com',
        farm_name: 'asassaas',
        id: 1,
        total_area: 40,
        vegetation_area: 5,
        planted_crops: [PlantedCrops.CAFE],
      };
      const updatedUser: User = {
        arable_area: 31,
        city: 'curitiba',
        cpf_or_cnpj: '688.156.730-83',
        email: 'asdasddsa@gmail.com',
        farm_name: 'asassaas',
        id: 1,
        name: 'paulo',
        state: 'pr',
        total_area: 40,
        vegetation_area: 5,
      };

      jest.spyOn(updateUser, 'update').mockResolvedValue(updatedUser);

      const result: User = await controller.update(updateUserDto);

      expect(result).toBe(updatedUser);
    });
  });

  describe('delete', () => {
    it('should delete a user', async () => {
      const userId = 1;
      const deletedUser: User = {
        arable_area: 10,
        city: 'curitiba',
        cpf_or_cnpj: '688.156.730-83',
        email: 'paulo@consoni.com',
        farm_name: 'farmville',
        id: 1,
        name: 'paulo',
        state: 'pr',
        total_area: 30,
        vegetation_area: 9,
      };

      jest.spyOn(removeUser, 'delete').mockResolvedValue(deletedUser);

      const result: User = await controller.delete(userId);

      expect(result).toBe(deletedUser);
    });
  });
});
