import { validate } from 'class-validator';
import { CreateUserDto } from '../../src/users/dto/create-user.dto';

describe('CreateUserDto', () => {
  let dto: CreateUserDto;

  beforeEach(() => {
    dto = new CreateUserDto();
    // Set valid default values
    dto.first_name = 'John';
    dto.last_name = 'Doe';
    dto.email = 'john.doe@example.com';
    dto.phone_number = '+79991234567';
    dto.password = 'password123';
  });

  it('should validate with correct data', async () => {
    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });

  it('should fail validation with invalid email', async () => {
    dto.email = 'invalid-email';
    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].constraints).toHaveProperty('isEmail');
  });

  it('should fail validation with invalid phone number', async () => {
    dto.phone_number = '123456'; // Invalid format for RU
    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].constraints).toHaveProperty('isPhoneNumber');
  });

  it('should fail validation with short password', async () => {
    dto.password = '12345'; // Less than 6 characters
    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].constraints).toHaveProperty('minLength');
  });

  it('should fail validation with missing first name', async () => {
    dto.first_name = null as any;
    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].constraints).toHaveProperty('isString');
  });

  it('should fail validation with missing last name', async () => {
    dto.last_name = null as any;
    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].constraints).toHaveProperty('isString');
  });

  it('should fail validation with missing email', async () => {
    dto.email = null as any;
    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].constraints).toHaveProperty('isEmail');
  });

  it('should fail validation with missing phone number', async () => {
    dto.phone_number = null as any;
    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].constraints).toHaveProperty('isPhoneNumber');
  });

  it('should fail validation with missing password', async () => {
    dto.password = null as any;
    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].constraints).toHaveProperty('minLength');
  });
}); 