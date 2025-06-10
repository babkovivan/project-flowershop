import { Test, TestingModule } from '@nestjs/testing';
import { OrderItemsService } from '../src/order-items/order-items.service';
import { PrismaService } from '../src/prisma.service';

describe('OrderItemsService', () => {
  let service: OrderItemsService;
  let prismaService: PrismaService;

  const mockPrismaService = {
    order_items: {
      create: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrderItemsService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<OrderItemsService>(OrderItemsService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    const createOrderItemDto = {
      order_id: 1,
      bouquet_id: 2,
      quantity: 3,
    };

    const mockOrderItem = {
      order_item_id: 1,
      ...createOrderItemDto,
      created_at: new Date(),
      updated_at: new Date(),
    };

    it('should create a new order item successfully', async () => {
      mockPrismaService.order_items.create.mockResolvedValue(mockOrderItem);

      const result = await service.create(createOrderItemDto);

      expect(mockPrismaService.order_items.create).toHaveBeenCalledWith({
        data: createOrderItemDto,
      });
      expect(result).toEqual(createOrderItemDto);
    });

    it('should throw error if order item creation fails', async () => {
      mockPrismaService.order_items.create.mockRejectedValue(new Error());

      await expect(service.create(createOrderItemDto)).rejects.toThrow(
        'Не удалось создать состав заказа.',
      );
    });
  });

  describe('findAll', () => {
    it('should return array of order items', async () => {
      const mockOrderItems = [
        {
          order_item_id: 1,
          order_id: 1,
          bouquet_id: 2,
          quantity: 3,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ];

      mockPrismaService.order_items.findMany.mockResolvedValue(mockOrderItems);

      const result = await service.findAll();

      expect(result).toEqual(mockOrderItems);
      expect(mockPrismaService.order_items.findMany).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a string with the order item id', () => {
      const result = service.findOne(1);
      expect(result).toBe('This action returns a #1 orderItem');
    });
  });

  describe('update', () => {
    it('should return a string with the order item id', () => {
      const result = service.update(1, {});
      expect(result).toBe('This action updates a #1 orderItem');
    });
  });

  describe('remove', () => {
    it('should return a string with the order item id', () => {
      const result = service.remove(1);
      expect(result).toBe('This action removes a #1 orderItem');
    });
  });
}); 