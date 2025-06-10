import { validate } from 'class-validator';
import { CreateOrderDto } from '../../src/orders/dto/create-order.dto';

describe('CreateOrderDto', () => {
  let dto: CreateOrderDto;

  beforeEach(() => {
    dto = new CreateOrderDto();
    // Set valid default values
    dto.user_id = 1;
    dto.order_date = new Date('2024-01-20T10:00:00.000Z');
    dto.delivery_date = new Date('2024-01-22T14:00:00.000Z');
    dto.delivery_address = '123 Main St';
    dto.total_amount = 3500;
    dto.status = 'Pending';
  });

  it('should validate with correct data', async () => {
    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });

  it('should validate without optional status', async () => {
    dto.status = null as any;
    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });

  it('should fail validation with invalid user_id', async () => {
    dto.user_id = 'invalid' as any;
    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].constraints).toHaveProperty('isNumber');
  });

  it('should fail validation with missing user_id', async () => {
    dto.user_id = null as any;
    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].constraints).toHaveProperty('isNumber');
  });

  it('should fail validation with invalid order_date', async () => {
    dto.order_date = 'invalid-date' as any;
    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].constraints).toHaveProperty('isDate');
  });

  it('should fail validation with missing order_date', async () => {
    dto.order_date = null as any;
    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].constraints).toHaveProperty('isDate');
  });

  it('should fail validation with invalid delivery_date', async () => {
    dto.delivery_date = 'invalid-date' as any;
    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].constraints).toHaveProperty('isDate');
  });

  it('should fail validation with missing delivery_date', async () => {
    dto.delivery_date = null as any;
    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].constraints).toHaveProperty('isDate');
  });

  it('should fail validation with invalid delivery_address', async () => {
    dto.delivery_address = null as any;
    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].constraints).toHaveProperty('isString');
  });

  it('should fail validation with invalid total_amount', async () => {
    dto.total_amount = 'invalid' as any;
    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].constraints).toHaveProperty('isInt');
  });

  it('should fail validation with missing total_amount', async () => {
    dto.total_amount = null as any;
    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].constraints).toHaveProperty('isInt');
  });

  it('should fail validation with invalid status', async () => {
    dto.status = 123 as any;
    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].constraints).toHaveProperty('isString');
  });
}); 