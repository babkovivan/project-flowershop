import { validate } from 'class-validator';
import { CreateReviewDto } from '../../src/reviews/dto/create-review.dto';

describe('CreateReviewDto', () => {
  let dto: CreateReviewDto;

  beforeEach(() => {
    dto = new CreateReviewDto();
    // Set valid default values
    dto.user_id = 1;
    dto.comment = 'Beautiful flowers!';
    dto.review_date = new Date('2024-01-20T10:00:00.000Z');
    dto.rating = 5;
  });

  it('should validate with correct data', async () => {
    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });

  it('should validate without optional rating', async () => {
    dto.rating = null as any;
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

  it('should fail validation with invalid comment', async () => {
    dto.comment = null as any;
    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].constraints).toHaveProperty('isString');
  });

  it('should fail validation with missing comment', async () => {
    dto.comment = null as any;
    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].constraints).toHaveProperty('isString');
  });

  it('should fail validation with invalid review_date', async () => {
    dto.review_date = 'invalid-date' as any;
    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].constraints).toHaveProperty('isDate');
  });

  it('should fail validation with missing review_date', async () => {
    dto.review_date = null as any;
    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].constraints).toHaveProperty('isDate');
  });

  it('should fail validation with rating below minimum', async () => {
    dto.rating = 0;
    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].constraints).toHaveProperty('min');
  });

  it('should fail validation with rating above maximum', async () => {
    dto.rating = 6;
    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].constraints).toHaveProperty('max');
  });

  it('should fail validation with invalid rating type', async () => {
    dto.rating = 'invalid' as any;
    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].constraints).toHaveProperty('isNumber');
  });
}); 