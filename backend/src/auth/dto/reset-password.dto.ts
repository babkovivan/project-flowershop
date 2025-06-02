import { IsString, IsEmail, MinLength } from 'class-validator';

export class ResetPasswordRequestDto {
    @IsEmail()
    email: string;
}

export class CheckTokenDto {
    @IsString()
    token: string;
}

export class ResetPasswordDto {
    @IsString()
    token: string;

    @IsString()
    @MinLength(6)
    newPassword: string;
} 