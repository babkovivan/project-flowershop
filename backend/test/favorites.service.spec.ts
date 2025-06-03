import { Test, TestingModule } from '@nestjs/testing';
import { FavoritesService } from '../src/favorites/favorites.service';
import { PrismaService } from '../src/prisma.service';
import { CreateFavoriteDto } from '../src/favorites/dto/create-favorite.dto';

describe('FavoritesService', () => {
  let service: FavoritesService;
  let prismaService: PrismaService;

  const mockPrismaService = {
    favorites: {
      findMany: jest.fn(),
      findUnique: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FavoritesService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<FavoritesService>(FavoritesService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new favorite', async () => {
      const createFavoriteDto: CreateFavoriteDto = {
        user_id: 1,
        bouquet_id: 2,
        added_date: new Date('2024-01-20')
      };

      const expectedFavorite = {
        ...createFavoriteDto,
        id: 1
      };

      mockPrismaService.favorites.create.mockResolvedValue(expectedFavorite);

      const result = await service.create(createFavoriteDto);
      expect(result).toEqual(createFavoriteDto);
      expect(mockPrismaService.favorites.create).toHaveBeenCalledWith({
        data: {
          user_id: createFavoriteDto.user_id,
          bouquet_id: createFavoriteDto.bouquet_id,
          added_date: expect.any(Date)
        },
      });
    });
  });

  describe('findAll', () => {
    it('should return array of favorites', async () => {
      const expectedFavorites = [
        { id: 1, user_id: 1, bouquet_id: 2, added_date: new Date() },
        { id: 2, user_id: 1, bouquet_id: 3, added_date: new Date() },
      ];

      mockPrismaService.favorites.findMany.mockResolvedValue(expectedFavorites);

      const result = await service.findAll();
      expect(result).toEqual(expectedFavorites);
      expect(mockPrismaService.favorites.findMany).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a message with the favorite id', async () => {
      const result = await service.findOne(1);
      expect(result).toBe('This action returns a #1 favorite');
    });
  });
}); 