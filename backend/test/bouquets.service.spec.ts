import { Test, TestingModule } from '@nestjs/testing';
import { BouquetsService } from '../src/bouquets/bouquets.service';
import { PrismaService } from '../src/prisma.service';

describe('BouquetsService', () => {
  let service: BouquetsService;
  let prismaService: PrismaService;

  const mockPrismaService = {
    bouquets: {
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
        BouquetsService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<BouquetsService>(BouquetsService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return array of bouquets', async () => {
      const expectedBouquets = [
        { id: 1, name: 'Rose Bouquet', price: 29.99 },
        { id: 2, name: 'Tulip Mix', price: 24.99 },
      ];

      mockPrismaService.bouquets.findMany.mockResolvedValue(expectedBouquets);

      const result = await service.findAll();
      expect(result).toEqual(expectedBouquets);
      expect(mockPrismaService.bouquets.findMany).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a single bouquet', async () => {
      const mockBouquet = { id: 1, name: 'Rose Bouquet', price: 29.99 };
      mockPrismaService.bouquets.findUnique.mockResolvedValue(mockBouquet);

      const result = await service.findOne(1);
      expect(typeof result).toBe('string');
      expect(result).toContain('1');
    });
  });
}); 