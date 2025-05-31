import { Test, TestingModule } from '@nestjs/testing';
import { OrderItemsController } from '../../src/order-items/order-items.controller';
import { OrderItemsService } from '../../src/order-items/order-items.service';
import { CreateOrderItemDto } from '../../src/order-items/dto/create-order-item.dto';
import { UpdateOrderItemDto } from '../../src/order-items/dto/update-order-item.dto';

describe('OrderItemsController', () => {
  let controller: OrderItemsController;
  let service: OrderItemsService;

  const mockOrderItemsService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderItemsController],
      providers: [
        {
          provide: OrderItemsService,
          useValue: mockOrderItemsService,
        },
      ],
    }).compile();

    controller = module.get<OrderItemsController>(OrderItemsController);
    service = module.get<OrderItemsService>(OrderItemsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create an order item', async () => {
      const createOrderItemDto: CreateOrderItemDto = {
        order_id: 1,
        bouquet_id: 2,
        quantity: 3,
      };

      mockOrderItemsService.create.mockResolvedValue(createOrderItemDto);

      const result = await controller.create(createOrderItemDto);
      expect(result).toEqual(createOrderItemDto);
      expect(mockOrderItemsService.create).toHaveBeenCalledWith(createOrderItemDto);
    });
  });

  describe('findAll', () => {
    it('should return array of order items', async () => {
      const orderItems = [
        { id: 1, order_id: 1, bouquet_id: 2, quantity: 3 },
        { id: 2, order_id: 1, bouquet_id: 3, quantity: 1 },
      ];

      mockOrderItemsService.findAll.mockResolvedValue(orderItems);

      const result = await controller.findAll();
      expect(result).toEqual(orderItems);
      expect(mockOrderItemsService.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a single order item', async () => {
      const id = '1';
      const orderItem = { id: 1, order_id: 1, bouquet_id: 2, quantity: 3 };

      mockOrderItemsService.findOne.mockResolvedValue(orderItem);

      const result = await controller.findOne(id);
      expect(result).toEqual(orderItem);
      expect(mockOrderItemsService.findOne).toHaveBeenCalledWith(1);
    });
  });

  describe('update', () => {
    it('should update an order item', async () => {
      const id = '1';
      const updateOrderItemDto: UpdateOrderItemDto = {
        quantity: 4,
      };
      const updatedOrderItem = { 
        id: 1, 
        order_id: 1, 
        bouquet_id: 2, 
        quantity: 4 
      };

      mockOrderItemsService.update.mockResolvedValue(updatedOrderItem);

      const result = await controller.update(id, updateOrderItemDto);
      expect(result).toEqual(updatedOrderItem);
      expect(mockOrderItemsService.update).toHaveBeenCalledWith(1, updateOrderItemDto);
    });
  });

  describe('remove', () => {
    it('should remove an order item', async () => {
      const id = '1';
      const deletedOrderItem = { 
        id: 1, 
        order_id: 1, 
        bouquet_id: 2, 
        quantity: 3 
      };

      mockOrderItemsService.remove.mockResolvedValue(deletedOrderItem);

      const result = await controller.remove(id);
      expect(result).toEqual(deletedOrderItem);
      expect(mockOrderItemsService.remove).toHaveBeenCalledWith(1);
    });
  });
}); 