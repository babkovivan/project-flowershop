import { validate } from 'class-validator';
import { CreateBouquetDto } from '../../src/bouquets/dto/create-bouquet.dto';

describe('CreateBouquetDto', () => {
  let dto: CreateBouquetDto;

  beforeEach(() => {
    dto = new CreateBouquetDto();
    // Set valid default values
    dto.name = 'Red Roses';
    dto.description = 'A beautiful arrangement of red roses.';
    dto.price = 3500;
    dto.image_url = 'https://example.com/red_roses.jpg';
    dto.category_id = 1;
  });

  it('should validate with correct data', async () => {
    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });

  it('should validate with optional created_at', async () => {
    dto.created_at = new Date();
    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });

  it('should fail validation with missing name', async () => {
    dto.name = '' as any;
    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].constraints).toHaveProperty('isNotEmpty');
  });

  it('should fail validation with missing description', async () => {
    dto.description = '' as any;
    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].constraints).toHaveProperty('isNotEmpty');
  });

  it('should fail validation with invalid price', async () => {
    dto.price = 'invalid' as any;
    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].constraints).toHaveProperty('isNumber');
  });

  it('should fail validation with missing price', async () => {
    dto.price = null as any;
    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].constraints).toHaveProperty('isNotEmpty');
  });

  it('should fail validation with missing image_url', async () => {
    dto.image_url = '' as any;
    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].constraints).toHaveProperty('isNotEmpty');
  });

  it('should fail validation with invalid category_id', async () => {
    dto.category_id = 'invalid' as any;
    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].constraints).toHaveProperty('isNumber');
  });

  it('should fail validation with missing category_id', async () => {
    dto.category_id = null as any;
    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].constraints).toHaveProperty('isNotEmpty');
  });

  it('should fail validation with invalid created_at', async () => {
    dto.created_at = 'invalid-date' as any;
    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].constraints).toHaveProperty('isDate');
  });
}); 