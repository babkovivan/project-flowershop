import { Test, TestingModule } from '@nestjs/testing';
import { OrdersController } from '../../src/orders/orders.controller';
import { OrdersService } from '../../src/orders/orders.service';
import { CreateOrderDto } from '../../src/orders/dto/create-order.dto';
import { UpdateOrderDto } from '../../src/orders/dto/update-order.dto';

describe('OrdersController', () => {
  let controller: OrdersController;
  let service: OrdersService;

  const mockOrdersService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrdersController],
      providers: [
        {
          provide: OrdersService,
          useValue: mockOrdersService,
        },
      ],
    }).compile();

    controller = module.get<OrdersController>(OrdersController);
    service = module.get<OrdersService>(OrdersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create an order', async () => {
      const createOrderDto: CreateOrderDto = {
        user_id: 1,
        order_date: new Date(),
        delivery_date: new Date(),
        delivery_address: '123 Main St',
        total_amount: 3500,
        status: 'pending'
      };

      mockOrdersService.create.mockResolvedValue(createOrderDto);

      const result = await controller.create(createOrderDto);
      expect(result).toEqual(createOrderDto);
      expect(mockOrdersService.create).toHaveBeenCalledWith(createOrderDto);
    });
  });

  describe('findAll', () => {
    it('should return array of orders', async () => {
      const orders = [
        { 
          id: 1, 
          user_id: 1,
          order_date: new Date(),
          delivery_date: new Date(),
          delivery_address: '123 Main St',
          total_amount: 3500,
          status: 'pending'
        },
        { 
          id: 2, 
          user_id: 2,
          order_date: new Date(),
          delivery_date: new Date(),
          delivery_address: '456 Oak St',
          total_amount: 4500,
          status: 'completed'
        },
      ];

      mockOrdersService.findAll.mockResolvedValue(orders);

      const result = await controller.findAll();
      expect(result).toEqual(orders);
      expect(mockOrdersService.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a single order', async () => {
      const id = '1';
      const order = { 
        id: 1, 
        user_id: 1,
        order_date: new Date(),
        delivery_date: new Date(),
        delivery_address: '123 Main St',
        total_amount: 3500,
        status: 'pending'
      };

      mockOrdersService.findOne.mockResolvedValue(order);

      const result = await controller.findOne(id);
      expect(result).toEqual(order);
      expect(mockOrdersService.findOne).toHaveBeenCalledWith(1);
    });
  });

  describe('update', () => {
    it('should update an order', async () => {
      const id = '1';
      const updateOrderDto: UpdateOrderDto = {
        status: 'completed',
      };
      const updatedOrder = { 
        id: 1, 
        user_id: 1,
        order_date: new Date(),
        delivery_date: new Date(),
        delivery_address: '123 Main St',
        total_amount: 3500,
        status: 'completed'
      };

      mockOrdersService.update.mockResolvedValue(updatedOrder);

      const result = await controller.update(id, updateOrderDto);
      expect(result).toEqual(updatedOrder);
      expect(mockOrdersService.update).toHaveBeenCalledWith(1, updateOrderDto);
    });
  });

  describe('remove', () => {
    it('should remove an order', async () => {
      const id = '1';
      const deletedOrder = { 
        id: 1, 
        user_id: 1,
        order_date: new Date(),
        delivery_date: new Date(),
        delivery_address: '123 Main St',
        total_amount: 3500,
        status: 'pending'
      };

      mockOrdersService.remove.mockResolvedValue(deletedOrder);

      const result = await controller.remove(id);
      expect(result).toEqual(deletedOrder);
      expect(mockOrdersService.remove).toHaveBeenCalledWith(1);
    });
  });
}); 