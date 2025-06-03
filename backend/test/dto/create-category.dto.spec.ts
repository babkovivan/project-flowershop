import { validate } from 'class-validator';
import { CreateCategoryDto } from '../../src/categories/dto/create-category.dto';

describe('CreateCategoryDto', () => {
  it('should pass validation with valid data', async () => {
    const dto = new CreateCategoryDto();
    dto.name = 'Wedding Bouquets';

    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });

  it('should fail validation without name', async () => {
    const dto = new CreateCategoryDto();

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].constraints).toHaveProperty('isString');
  });

  it('should fail validation with non-string name', async () => {
    const dto = new CreateCategoryDto();
    (dto as any).name = 123;

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].constraints).toHaveProperty('isString');
  });
}); 