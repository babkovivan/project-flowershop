import { validate } from 'class-validator';
import { CreateFavoriteDto } from '../../src/favorites/dto/create-favorite.dto';

describe('CreateFavoriteDto', () => {
  it('should pass validation with valid data', async () => {
    const dto = new CreateFavoriteDto();
    dto.user_id = 1;
    dto.bouquet_id = 2;
    dto.added_date = new Date();

    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });

  it('should pass validation without added_date (optional)', async () => {
    const dto = new CreateFavoriteDto();
    dto.user_id = 1;
    dto.bouquet_id = 2;

    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });

  it('should fail validation without user_id', async () => {
    const dto = new CreateFavoriteDto();
    dto.bouquet_id = 2;
    dto.added_date = new Date();

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].constraints).toHaveProperty('isNumber');
  });

  it('should fail validation without bouquet_id', async () => {
    const dto = new CreateFavoriteDto();
    dto.user_id = 1;
    dto.added_date = new Date();

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].constraints).toHaveProperty('isNumber');
  });

  it('should fail validation with non-number user_id', async () => {
    const dto = new CreateFavoriteDto();
    (dto as any).user_id = '1';
    dto.bouquet_id = 2;
    dto.added_date = new Date();

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].constraints).toHaveProperty('isNumber');
  });

  it('should fail validation with non-number bouquet_id', async () => {
    const dto = new CreateFavoriteDto();
    dto.user_id = 1;
    (dto as any).bouquet_id = '2';
    dto.added_date = new Date();

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].constraints).toHaveProperty('isNumber');
  });

  it('should fail validation with invalid date', async () => {
    const dto = new CreateFavoriteDto();
    dto.user_id = 1;
    dto.bouquet_id = 2;
    dto.added_date = 'invalid date' as any;

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].constraints).toHaveProperty('isDate');
  });

  it('should fail validation with negative user_id', async () => {
    const dto = new CreateFavoriteDto();
    dto.user_id = -1;
    dto.bouquet_id = 2;
    dto.added_date = new Date();

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].constraints).toHaveProperty('min');
  });

  it('should fail validation with negative bouquet_id', async () => {
    const dto = new CreateFavoriteDto();
    dto.user_id = 1;
    dto.bouquet_id = -2;
    dto.added_date = new Date();

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].constraints).toHaveProperty('min');
  });
}); 