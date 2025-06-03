import { Injectable, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { IUser } from 'src/types/types';
import { RegistrationStatus } from './interfaces/registration-status.interface';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { LoginUserDto } from './dto/user-login.dto';
import { LoginStatus } from './interfaces/login-status.interface';
import { JwtPayload } from './interfaces/payload.interface';
import { ConfigService } from '@nestjs/config';
import { ResetPasswordDto } from './dto/reset-password.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}
  
  async register(userDto: CreateUserDto): Promise<RegistrationStatus> {
    let status: RegistrationStatus = {
      status: 200,
      success: true,
      message: 'User registered',
    };

    try {
      await this.usersService.create(userDto);
    } catch (err) {
      status = {
        status: 400,
        success: false,
        message: err.message,
      };
    }

    return status;
  }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findOne(email);
    if (!user) {
      throw new UnauthorizedException('Неверный email или пароль');
    }

    const passwordIsMatch = await bcrypt.compare(password, user.password);
    if (!passwordIsMatch) {
      throw new UnauthorizedException('Неверный email или пароль');
    }

    const { password: _, ...result } = user;
    return result;
  }

  async login(loginUserDto: LoginUserDto): Promise<LoginStatus> {
    const user = await this.validateUser(loginUserDto.email, loginUserDto.password);
    
    const payload = { 
      id: user.user_id,
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name
    };

    const token = this._createToken(payload);
    await this.usersService.updateSessionToken(user.user_id, token.accessToken);

    return {
      id: user.user_id,
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
      ...token,
    };
  }

  private _createToken(user: JwtPayload): any {
    const tokenExpiresIn = this.configService.get<number>('TOKEN_EXPIRES_IN') || 3600000;
    const expiresIn = new Date().getTime() + tokenExpiresIn;
    
    const payload: JwtPayload = {
      id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email
    };
    
    const accessToken = this.jwtService.sign(payload);

    return {
      id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      accessToken,
    };
  }

  async resetPassword(resetPasswordDto: ResetPasswordDto) {
    const { email, newPassword } = resetPasswordDto;
    
    // Найти пользователя по email
    const user = await this.usersService.findOne(email);
    if (!user) {
      throw new NotFoundException('Пользователь с таким email не найден');
    }

    // Хешируем новый пароль
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Обновляем пароль пользователя
    await this.usersService.updatePassword(user.user_id, hashedPassword);

    return {
      status: 200,
      success: true,
      message: 'Пароль успешно изменен'
    };
  }
}