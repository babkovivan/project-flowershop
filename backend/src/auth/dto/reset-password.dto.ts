import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class ResetPasswordDto {
  @ApiProperty({ 
    description: 'Email address',
    example: 'user@example.com'
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ 
    description: 'New password',
    example: 'newSecurePassword123',
    minLength: 6
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  newPassword: string;
} 