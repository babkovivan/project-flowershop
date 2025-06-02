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
@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService:JwtService) {}
  
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
      return null;
    }

    const passwordIsMatch = await bcrypt.compare(password, user.password);
    if (passwordIsMatch) {
      const { password, ...result } = user;
      return result;
    }
    throw new UnauthorizedException("Почта или пароль введены неправильно!");
  }
async login(loginUserDto: LoginUserDto): Promise<LoginStatus> {
        const user = await this.usersService.findByLogin(loginUserDto);
        const token = this._createToken(user);
        await this.usersService.updateSessionToken(user.user_id, token.accessToken)

        return {
            email: user.email,
            ...token,
        };
    }
    private _createToken({user_id, first_name, last_name, email}: CreateUserDto): any {
        const expiresIn = new Date().getTime() + +process.env.TOKEN_EXPIRES_IN;
        const user: JwtPayload = {user_id, first_name, last_name, email};
        const accessToken = this.jwtService.sign(user);

        return {
            user_id,
            first_name,
            last_name,
            email,
            accessToken,
        };
    }
  }