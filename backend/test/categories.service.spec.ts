import { Test, TestingModule } from '@nestjs/testing';
import { CategoriesService } from '../src/categories/categories.service';
import { PrismaService } from '../src/prisma.service';
import { CreateCategoryDto } from '../src/categories/dto/create-category.dto';

describe('CategoriesService', () => {
  let service: CategoriesService;
  let prismaService: PrismaService;

  const mockPrismaService = {
    categories: {
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
        CategoriesService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<CategoriesService>(CategoriesService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new category', async () => {
      const createCategoryDto: CreateCategoryDto = {
        name: 'Wedding Bouquets'
      };

      const expectedCategory = {
        id: 1,
        ...createCategoryDto
      };

      mockPrismaService.categories.create.mockResolvedValue(expectedCategory);

      const result = await service.create(createCategoryDto);
      expect(result).toEqual(createCategoryDto);
      expect(mockPrismaService.categories.create).toHaveBeenCalledWith({
        data: {
          name: createCategoryDto.name
        },
      });
    });

    it('should handle errors when creating category', async () => {
      const createCategoryDto: CreateCategoryDto = {
        name: 'Wedding Bouquets'
      };

      mockPrismaService.categories.create.mockRejectedValue(new Error('Database error'));

      await expect(service.create(createCategoryDto)).rejects.toThrow('Не удалось создать категорию.');
    });
  });

  describe('findAll', () => {
    it('should return array of categories', async () => {
      const expectedCategories = [
        { id: 1, name: 'Wedding Bouquets' },
        { id: 2, name: 'Birthday Bouquets' },
      ];

      mockPrismaService.categories.findMany.mockResolvedValue(expectedCategories);

      const result = await service.findAll();
      expect(result).toEqual(expectedCategories);
      expect(mockPrismaService.categories.findMany).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a message with the category id', async () => {
      const result = await service.findOne(1);
      expect(result).toBe('This action returns a #1 category');
    });
  });
}); 