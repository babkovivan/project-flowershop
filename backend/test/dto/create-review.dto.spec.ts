import { validate } from 'class-validator';
import { CreateReviewDto } from '../../src/reviews/dto/create-review.dto';

describe('CreateReviewDto', () => {
  it('should pass validation with valid data', async () => {
    const dto = new CreateReviewDto();
    dto.user_id = 1;
    dto.comment = 'Great bouquet!';
    dto.review_date = new Date();
    dto.rating = 5;

    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });

  it('should pass validation without rating (optional)', async () => {
    const dto = new CreateReviewDto();
    dto.user_id = 1;
    dto.comment = 'Great bouquet!';
    dto.review_date = new Date();

    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });

  it('should fail validation without user_id', async () => {
    const dto = new CreateReviewDto();
    dto.comment = 'Great bouquet!';
    dto.review_date = new Date();
    dto.rating = 5;

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].constraints).toHaveProperty('isNumber');
  });

  it('should fail validation without comment', async () => {
    const dto = new CreateReviewDto();
    dto.user_id = 1;
    dto.review_date = new Date();
    dto.rating = 5;

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].constraints).toHaveProperty('isString');
  });

  it('should fail validation with non-string comment', async () => {
    const dto = new CreateReviewDto();
    dto.user_id = 1;
    (dto as any).comment = 123;
    dto.review_date = new Date();
    dto.rating = 5;

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].constraints).toHaveProperty('isString');
  });

  it('should fail validation with rating below 1', async () => {
    const dto = new CreateReviewDto();
    dto.user_id = 1;
    dto.comment = 'Great bouquet!';
    dto.review_date = new Date();
    dto.rating = 0;

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].constraints).toHaveProperty('min');
  });

  it('should fail validation with rating above 5', async () => {
    const dto = new CreateReviewDto();
    dto.user_id = 1;
    dto.comment = 'Great bouquet!';
    dto.review_date = new Date();
    dto.rating = 6;

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].constraints).toHaveProperty('max');
  });

  it('should fail validation with invalid date', async () => {
    const dto = new CreateReviewDto();
    dto.user_id = 1;
    dto.comment = 'Great bouquet!';
    dto.review_date = 'invalid date' as any;
    dto.rating = 5;

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].constraints).toHaveProperty('isDate');
  });
}); 