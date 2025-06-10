import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '../src/users/users.service';
import { PrismaService } from '../src/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

jest.mock('bcrypt', () => ({
  hash: jest.fn(),
  compare: jest.fn(),
}));

describe('UsersService', () => {
  let service: UsersService;
  let prismaService: PrismaService;
  let jwtService: JwtService;

  const mockPrismaService = {
    users: {
      create: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
    },
  };

  const mockJwtService = {
    sign: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    prismaService = module.get<PrismaService>(PrismaService);
    jwtService = module.get<JwtService>(JwtService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    const createUserDto = {
      first_name: 'Test',
      last_name: 'User',
      email: 'test@example.com',
      phone_number: '+79991234567',
      password: 'password123',
    };

    const mockUser = {
      user_id: 1,
      ...createUserDto,
      password: 'hashedPassword',
      created_at: new Date(),
      updated_at: new Date(),
    };

    it('should create a new user successfully', async () => {
      const hashedPassword = 'hashedPassword';
      (bcrypt.hash as jest.Mock).mockResolvedValue(hashedPassword);
      mockPrismaService.users.create.mockResolvedValue(mockUser);
      mockJwtService.sign.mockReturnValue('mockToken');

      const result = await service.create(createUserDto);

      expect(bcrypt.hash).toHaveBeenCalledWith(createUserDto.password, 10);
      expect(mockPrismaService.users.create).toHaveBeenCalledWith({
        data: {
          ...createUserDto,
          password: hashedPassword,
        },
      });
      expect(result).toEqual({
        id: mockUser.user_id,
        first_name: mockUser.first_name,
        last_name: mockUser.last_name,
        email: mockUser.email,
        phone_number: mockUser.phone_number,
        password: mockUser.password,
      });
    });

    it('should throw error if email already exists', async () => {
      mockPrismaService.users.create.mockRejectedValue({ code: 'P2002' });

      await expect(service.create(createUserDto)).rejects.toThrow(
        'Пользователь с таким email уже существует',
      );
    });
  });

  describe('findAll', () => {
    it('should return array of users', async () => {
      const mockUsers = [
        {
          user_id: 1,
          first_name: 'Test',
          last_name: 'User',
          email: 'test@example.com',
          phone_number: '+79991234567',
          password: 'hashedPassword',
        },
      ];

      mockPrismaService.users.findMany.mockResolvedValue(mockUsers);

      const result = await service.findAll();

      expect(result).toEqual(mockUsers);
      expect(mockPrismaService.users.findMany).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should find a user by email', async () => {
      const mockUser = {
        user_id: 1,
        first_name: 'Test',
        last_name: 'User',
        email: 'test@example.com',
        phone_number: '+79991234567',
        password: 'hashedPassword',
      };

      mockPrismaService.users.findUnique.mockResolvedValue(mockUser);

      const result = await service.findOne('test@example.com');

      expect(result).toEqual(mockUser);
      expect(mockPrismaService.users.findUnique).toHaveBeenCalledWith({
        where: { email: 'test@example.com' },
      });
    });

    it('should return null if user not found', async () => {
      mockPrismaService.users.findUnique.mockResolvedValue(null);

      const result = await service.findOne('nonexistent@example.com');

      expect(result).toBeNull();
    });
  });

  describe('findByLogin', () => {
    const loginData = {
      email: 'test@example.com',
      password: 'password123',
    };

    const mockUser = {
      user_id: 1,
      first_name: 'Test',
      last_name: 'User',
      email: 'test@example.com',
      phone_number: '+79991234567',
      password: 'hashedPassword',
    };

    it('should return user if login credentials are valid', async () => {
      mockPrismaService.users.findUnique.mockResolvedValue(mockUser);
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);

      const result = await service.findByLogin(loginData);

      expect(result).toEqual({
        id: mockUser.user_id,
        first_name: mockUser.first_name,
        last_name: mockUser.last_name,
        email: mockUser.email,
        phone_number: mockUser.phone_number,
        password: mockUser.password,
      });
    });

    it('should throw NotFoundException if user not found', async () => {
      mockPrismaService.users.findUnique.mockResolvedValue(null);

      await expect(service.findByLogin(loginData)).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should throw NotFoundException if password is invalid', async () => {
      mockPrismaService.users.findUnique.mockResolvedValue(mockUser);
      (bcrypt.compare as jest.Mock).mockResolvedValue(false);

      await expect(service.findByLogin(loginData)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('updateSessionToken', () => {
    it('should update user session token', async () => {
      const userId = 1;
      const token = 'newToken';

      await service.updateSessionToken(userId, token);

      expect(mockPrismaService.users.update).toHaveBeenCalledWith({
        where: { user_id: userId },
        data: { session_token: token },
      });
    });
  });

  describe('update', () => {
    const userId = 1;
    const updateUserDto = {
      first_name: 'Updated',
      last_name: 'User',
    };

    const mockUpdatedUser = {
      user_id: userId,
      first_name: 'Updated',
      last_name: 'User',
      email: 'test@example.com',
      phone_number: '+79991234567',
      password: 'hashedPassword',
    };

    it('should update user successfully', async () => {
      mockPrismaService.users.update.mockResolvedValue(mockUpdatedUser);

      const result = await service.update(userId, updateUserDto);

      expect(result).toEqual({
        id: mockUpdatedUser.user_id,
        first_name: mockUpdatedUser.first_name,
        last_name: mockUpdatedUser.last_name,
        email: mockUpdatedUser.email,
        phone_number: mockUpdatedUser.phone_number,
        password: mockUpdatedUser.password,
      });
      expect(mockPrismaService.users.update).toHaveBeenCalledWith({
        where: { user_id: userId },
        data: updateUserDto,
      });
    });

    it('should throw error if update fails', async () => {
      mockPrismaService.users.update.mockRejectedValue(new Error());

      await expect(service.update(userId, updateUserDto)).rejects.toThrow(
        'Не удалось обновить пользователя.',
      );
    });
  });
}); 