import { validate } from 'class-validator';
import { CreateCategoryDto } from '../../src/categories/dto/create-category.dto';

describe('CreateCategoryDto', () => {
  let dto: CreateCategoryDto;

  beforeEach(() => {
    dto = new CreateCategoryDto();
    // Set valid default values
    dto.name = 'For wedding';
  });

  it('should validate with correct data', async () => {
    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });

  it('should fail validation with missing name', async () => {
    dto.name = null as any;
    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].constraints).toHaveProperty('isString');
  });

  it('should fail validation with invalid name type', async () => {
    dto.name = 123 as any;
    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].constraints).toHaveProperty('isString');
  });

  it('should fail validation with null name', async () => {
    dto.name = null as any;
    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].constraints).toHaveProperty('isString');
  });
}); 