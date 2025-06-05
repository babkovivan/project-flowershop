import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { IUser } from 'src/types/types';
import {RegistrationStatus} from './interfaces/registration-status.interface';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { LoginUserDto } from 'src/users/dto/user-login.dto';
import { LoginStatus } from './interfaces/login-status.interface';
import { JwtPayload } from './interfaces/payload.interface';
import { TokenPayload } from './interfaces/token-payload.interface';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JwtService) {}
  
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
      throw new UnauthorizedException("Пользователь не найден");
    }

    const passwordIsMatch = await bcrypt.compare(password, user.password);
    if (!passwordIsMatch) {
      throw new UnauthorizedException("Неверный пароль");
    }

    const { password: _, ...result } = user;
    return result;
  }

  async login(loginUserDto: LoginUserDto): Promise<LoginStatus> {
    const user = await this.validateUser(loginUserDto.email, loginUserDto.password);
    if (!user || !user.user_id) {
      throw new UnauthorizedException("Ошибка авторизации");
    }
    
    const token = this._createToken({
      id: user.user_id,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email
    });
    
    await this.usersService.updateSessionToken(user.user_id, token.accessToken);

    return {
      id: user.user_id,
      email: user.email,
      expiresIn: token.expiresIn,
      accessToken: token.accessToken,
    };
  }

  private _createToken(user: TokenPayload): any {
    const expiresIn = 30 * 24 * 60 * 60; // 30 days in seconds
    const payload: JwtPayload = {
      user_id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email
    };
    
    const accessToken = this.jwtService.sign(payload);

    return {
      expiresIn,
      accessToken,
    };
  }

  async logout(userId: number): Promise<{ message: string }> {
    await this.usersService.updateSessionToken(userId, null);
    return { message: 'Успешный выход из системы' };
  }
}