import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsDate, IsOptional, Min } from 'class-validator';

export class CreateFavoriteDto {

  @ApiProperty({ description: 'User ID', example: 1 })
  @IsNumber()
  @Min(1)
  user_id: number; 

  @ApiProperty({ description: 'Bouquet ID', example: 10 })
  @IsNumber()
  @Min(1)
  bouquet_id: number; 

  @ApiProperty({ description: 'Added Date', example: '2024-01-20T10:00:00.000Z' })
  @IsDate()
  @IsOptional()
  added_date: Date;
}