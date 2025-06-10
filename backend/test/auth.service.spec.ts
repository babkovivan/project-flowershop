import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../src/auth/auth.service';
import { UsersService } from '../src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

describe('AuthService', () => {
  let service: AuthService;
  let usersService: UsersService;
  let jwtService: JwtService;

  const mockUsersService = {
    create: jest.fn(),
    findOne: jest.fn(),
    updateSessionToken: jest.fn(),
  };

  const mockJwtService = {
    sign: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: mockUsersService,
        },
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    usersService = module.get<UsersService>(UsersService);
    jwtService = module.get<JwtService>(JwtService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('register', () => {
    const createUserDto = {
      email: 'test@example.com',
      password: 'password123',
      first_name: 'Test',
      last_name: 'User',
      phone_number: '+79991234567'
    };

    it('should successfully register a user', async () => {
      mockUsersService.create.mockResolvedValue(undefined);

      const result = await service.register(createUserDto);

      expect(result).toEqual({
        status: 200,
        success: true,
        message: 'User registered',
      });
      expect(mockUsersService.create).toHaveBeenCalledWith(createUserDto);
    });

    it('should handle registration failure', async () => {
      const error = new Error('Email already exists');
      mockUsersService.create.mockRejectedValue(error);

      const result = await service.register(createUserDto);

      expect(result).toEqual({
        status: 400,
        success: false,
        message: 'Email already exists',
      });
    });
  });

  describe('validateUser', () => {
    const mockUser = {
      user_id: 1,
      email: 'test@example.com',
      password: 'hashedPassword',
      first_name: 'Test',
      last_name: 'User',
      phone_number: '+79991234567'
    };

    it('should successfully validate user', async () => {
      mockUsersService.findOne.mockResolvedValue(mockUser);
      jest.spyOn(bcrypt, 'compare').mockImplementation(() => Promise.resolve(true));

      const result = await service.validateUser('test@example.com', 'password123');

      const { password, ...expectedResult } = mockUser;
      expect(result).toEqual(expectedResult);
    });

    it('should throw UnauthorizedException when user not found', async () => {
      mockUsersService.findOne.mockResolvedValue(null);

      await expect(service.validateUser('test@example.com', 'password123'))
        .rejects
        .toThrow(UnauthorizedException);
    });

    it('should throw UnauthorizedException when password is incorrect', async () => {
      mockUsersService.findOne.mockResolvedValue(mockUser);
      jest.spyOn(bcrypt, 'compare').mockImplementation(() => Promise.resolve(false));

      await expect(service.validateUser('test@example.com', 'wrongpassword'))
        .rejects
        .toThrow(UnauthorizedException);
    });
  });

  describe('login', () => {
    const loginUserDto = {
      email: 'test@example.com',
      password: 'password123',
    };

    const mockValidatedUser = {
      user_id: 1,
      email: 'test@example.com',
      first_name: 'Test',
      last_name: 'User',
      phone_number: '+79991234567'
    };

    const mockToken = {
      accessToken: 'mockAccessToken',
      expiresIn: 2592000,
    };

    beforeEach(() => {
      jest.spyOn(service, 'validateUser').mockResolvedValue(mockValidatedUser);
      mockJwtService.sign.mockReturnValue(mockToken.accessToken);
    });

    it('should successfully login user', async () => {
      const result = await service.login(loginUserDto);

      expect(result).toEqual({
        id: mockValidatedUser.user_id,
        email: mockValidatedUser.email,
        accessToken: mockToken.accessToken,
        expiresIn: mockToken.expiresIn,
      });
      expect(mockUsersService.updateSessionToken).toHaveBeenCalledWith(
        mockValidatedUser.user_id,
        mockToken.accessToken,
      );
    });

    it('should throw UnauthorizedException when validation fails', async () => {
      jest.spyOn(service, 'validateUser').mockResolvedValue(null);

      await expect(service.login(loginUserDto))
        .rejects
        .toThrow(UnauthorizedException);
    });
  });

  describe('logout', () => {
    it('should successfully logout user', async () => {
      mockUsersService.updateSessionToken.mockResolvedValue(undefined);

      const result = await service.logout(1);

      expect(result).toEqual({ message: 'Успешный выход из системы' });
      expect(mockUsersService.updateSessionToken).toHaveBeenCalledWith(1, null);
    });
  });
}); 