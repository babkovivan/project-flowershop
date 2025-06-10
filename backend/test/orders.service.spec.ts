import { Test, TestingModule } from '@nestjs/testing';
import { OrdersService } from '../src/orders/orders.service';
import { PrismaService } from '../src/prisma.service';

describe('OrdersService', () => {
  let service: OrdersService;
  let prismaService: PrismaService;

  const mockPrismaService = {
    orders: {
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
        OrdersService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<OrdersService>(OrdersService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    const createOrderDto = {
      user_id: 1,
      order_date: new Date('2024-01-20T10:00:00.000Z'),
      delivery_date: new Date('2024-01-22T14:00:00.000Z'),
      delivery_address: '123 Main St',
      total_amount: 3500,
      status: 'Pending',
    };

    const mockOrder = {
      order_id: 1,
      ...createOrderDto,
      created_at: new Date(),
      updated_at: new Date(),
    };

    it('should create a new order successfully', async () => {
      mockPrismaService.orders.create.mockResolvedValue(mockOrder);

      const result = await service.create(createOrderDto);

      expect(mockPrismaService.orders.create).toHaveBeenCalledWith({
        data: createOrderDto,
      });
      expect(result).toEqual(createOrderDto);
    });

    it('should throw error if order creation fails', async () => {
      mockPrismaService.orders.create.mockRejectedValue(new Error());

      await expect(service.create(createOrderDto)).rejects.toThrow(
        'Не удалось создать букет.',
      );
    });
  });

  describe('findAll', () => {
    it('should return array of orders', async () => {
      const mockOrders = [
        {
          order_id: 1,
          user_id: 1,
          order_date: new Date('2024-01-20T10:00:00.000Z'),
          delivery_date: new Date('2024-01-22T14:00:00.000Z'),
          delivery_address: '123 Main St',
          total_amount: 3500,
          status: 'Pending',
          created_at: new Date(),
          updated_at: new Date(),
        },
      ];

      mockPrismaService.orders.findMany.mockResolvedValue(mockOrders);

      const result = await service.findAll();

      expect(result).toEqual(mockOrders);
      expect(mockPrismaService.orders.findMany).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a string with the order id', async () => {
      const result = service.findOne(1);
      expect(result).toBe('This action returns a #1 order');
    });
  });

  describe('update', () => {
    it('should return a string with the order id', () => {
      const result = service.update(1, {});
      expect(result).toBe('This action updates a #1 order');
    });
  });

  describe('remove', () => {
    it('should return a string with the order id', () => {
      const result = service.remove(1);
      expect(result).toBe('This action removes a #1 order');
    });
  });
}); 