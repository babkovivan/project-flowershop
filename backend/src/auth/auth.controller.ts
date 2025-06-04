import { Controller, Post, UseGuards, Request, Body, Headers } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { LocalAuthGuard } from './local-auth.guard';
import { LoginUserDto } from 'src/users/dto/user-login.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  
  @Post('login')
  @UseGuards(LocalAuthGuard)
  @ApiOperation({ summary: 'Авторизация пользователя' })
  @ApiResponse({ status: 200, description: 'Успешная авторизация' })
  @ApiResponse({ status: 401, description: 'Неверные учетные данные' })
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Post('login-email')
  @ApiOperation({ summary: 'Авторизация по email и паролю' })
  @ApiResponse({ status: 200, description: 'Успешная авторизация' })
  @ApiResponse({ status: 401, description: 'Неверные учетные данные' })
  async loginEmail(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }

  @Post('logout')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Выход из системы' })
  @ApiResponse({ status: 200, description: 'Успешный выход' })
  @ApiResponse({ status: 401, description: 'Не авторизован' })
  async logout(@Request() req) {
    return this.authService.logout(req.user.user_id);
  }
}
