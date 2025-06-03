import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from '../../src/users/users.controller';
import { UsersService } from '../../src/users/users.service';
import { CreateUserDto } from '../../src/users/dto/create-user.dto';
import { UpdateUserDto } from '../../src/users/dto/update-user.dto';
import { NotFoundException } from '@nestjs/common';

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  const mockUsersService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: mockUsersService,
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a user', async () => {
      const createUserDto: CreateUserDto = {
        first_name: 'John',
        last_name: 'Doe',
        email: 'john.doe@example.com',
        phone_number: '+79001234567',
        password: 'securePass123'
      };

      const expectedUser = {
        id: 1,
        ...createUserDto,
      };

      mockUsersService.create.mockResolvedValue(expectedUser);

      const result = await controller.create(createUserDto);
      expect(result).toEqual(expectedUser);
      expect(mockUsersService.create).toHaveBeenCalledWith(createUserDto);
    });
  });

  describe('findAll', () => {
    it('should return array of users', async () => {
      const users = [
        { 
          id: 1, 
          first_name: 'John',
          last_name: 'Doe',
          email: 'john.doe@example.com',
          phone_number: '+79001234567'
        },
        { 
          id: 2, 
          first_name: 'Jane',
          last_name: 'Smith',
          email: 'jane.smith@example.com',
          phone_number: '+79009876543'
        },
      ];

      mockUsersService.findAll.mockResolvedValue(users);

      const result = await controller.findAll();
      expect(result).toEqual(users);
      expect(mockUsersService.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a single user', async () => {
      const email = 'john.doe@example.com';
      const user = { 
        id: 1, 
        first_name: 'John',
        last_name: 'Doe',
        email: 'john.doe@example.com',
        phone_number: '+79001234567'
      };

      mockUsersService.findOne.mockResolvedValue(user);

      const result = await controller.findOne(email);
      expect(result).toEqual(user);
      expect(mockUsersService.findOne).toHaveBeenCalledWith(email);
    });

    it('should handle user not found', async () => {
      const email = 'nonexistent@example.com';
      mockUsersService.findOne.mockRejectedValue(new NotFoundException());

      await expect(controller.findOne(email)).rejects.toThrow(NotFoundException);
      expect(mockUsersService.findOne).toHaveBeenCalledWith(email);
    });
  });

  describe('update', () => {
    it('should update a user', async () => {
      const id = '1';
      const updateUserDto: UpdateUserDto = {
        phone_number: '+79009998877'
      };
      const updatedUser = { 
        id: 1, 
        first_name: 'John',
        last_name: 'Doe',
        email: 'john.doe@example.com',
        phone_number: '+79009998877'
      };

      mockUsersService.update.mockResolvedValue(updatedUser);

      const result = await controller.update(id, updateUserDto);
      expect(result).toEqual(updatedUser);
      expect(mockUsersService.update).toHaveBeenCalledWith(1, updateUserDto);
    });
  });

  describe('remove', () => {
    it('should remove a user', async () => {
      const id = '1';
      const deletedUser = { 
        id: 1, 
        first_name: 'John',
        last_name: 'Doe',
        email: 'john.doe@example.com',
        phone_number: '+79001234567'
      };

      mockUsersService.remove.mockResolvedValue(deletedUser);

      const result = await controller.remove(id);
      expect(result).toEqual(deletedUser);
      expect(mockUsersService.remove).toHaveBeenCalledWith(1);
    });
  });
}); 