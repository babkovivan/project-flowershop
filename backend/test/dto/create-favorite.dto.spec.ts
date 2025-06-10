import { validate } from 'class-validator';
import { CreateFavoriteDto } from '../../src/favorites/dto/create-favorite.dto';

describe('CreateFavoriteDto', () => {
  let dto: CreateFavoriteDto;

  beforeEach(() => {
    dto = new CreateFavoriteDto();
    // Set valid default values
    dto.user_id = 1;
    dto.bouquet_id = 10;
    dto.added_date = new Date('2024-01-20T10:00:00.000Z');
  });

  it('should validate with correct data', async () => {
    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });

  it('should validate without optional added_date', async () => {
    dto.added_date = null as any;
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

  it('should fail validation with user_id less than 1', async () => {
    dto.user_id = 0;
    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].constraints).toHaveProperty('min');
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

  it('should fail validation with bouquet_id less than 1', async () => {
    dto.bouquet_id = 0;
    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].constraints).toHaveProperty('min');
  });

  it('should fail validation with invalid added_date', async () => {
    dto.added_date = 'invalid-date' as any;
    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].constraints).toHaveProperty('isDate');
  });
}); 