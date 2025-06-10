import { validate } from 'class-validator';
import { CreateOrderItemDto } from '../../src/order-items/dto/create-order-item.dto';

describe('CreateOrderItemDto', () => {
  let dto: CreateOrderItemDto;

  beforeEach(() => {
    dto = new CreateOrderItemDto();
    // Set valid default values
    dto.order_id = 1;
    dto.bouquet_id = 2;
    dto.quantity = 3;
  });

  it('should validate with correct data', async () => {
    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });

  it('should fail validation with invalid order_id', async () => {
    dto.order_id = 'invalid' as any;
    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].constraints).toHaveProperty('isNumber');
  });

  it('should fail validation with missing order_id', async () => {
    dto.order_id = null as any;
    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].constraints).toHaveProperty('isNumber');
  });

  it('should fail validation with invalid bouquet_id', async () => {
    dto.bouquet_id = 'invalid' as any;
    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].constraints).toHaveProperty('isNumber');
  });

  it('should fail validation with missing bouquet_id', async () => {
    dto.bouquet_id = null as any;
    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].constraints).toHaveProperty('isNumber');
  });

  it('should fail validation with invalid quantity', async () => {
    dto.quantity = 'invalid' as any;
    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].constraints).toHaveProperty('isNumber');
  });

  it('should fail validation with missing quantity', async () => {
    dto.quantity = null as any;
    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].constraints).toHaveProperty('isNumber');
  });
}); 