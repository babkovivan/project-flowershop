import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginUserDto {
  @ApiProperty({ 
    description: 'Email address',
    example: 'user@example.com'
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ 
    description: 'Password',
    example: 'yourPassword123'
  })
  @IsString()
  @IsNotEmpty()
  password: string;
} 