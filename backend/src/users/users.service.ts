import { Injectable, NotFoundException, ConflictException, BadRequestException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService, private JwtService: JwtService) {}
  
  async create(user: CreateUserDto): Promise<any> {
    const { first_name, last_name, email, phone_number, password } = user;
    
    try {
      // Check if user with this email already exists
      const existingUser = await this.prisma.users.findUnique({
        where: { email }
      });
      
      if (existingUser) {
        throw new ConflictException('Пользователь с таким email уже существует');
      }
      
      const hashedPassword = await bcrypt.hash(password, 10);
      
      const newUser = await this.prisma.users.create({
        data: {
          first_name,
          last_name,
          email,
          phone_number,
          password: hashedPassword
        },
      });
      
      // Если мы дошли до этой точки, значит пользователь успешно создан
      return {
        status: 201,
        success: true,
        message: 'Пользователь успешно создан',
        user: {
          id: newUser.user_id,
          first_name: newUser.first_name,
          last_name: newUser.last_name,
          email: newUser.email,
          phone_number: newUser.phone_number
        }
      };
      
    } catch (error: any) {
      console.error('Ошибка при создании пользователя:', error);
      
      if (error instanceof ConflictException) {
        throw error;
      }
      
      if (error.code === 'P2002') {
        throw new ConflictException('Пользователь с таким email уже существует');
      }
      
      throw new BadRequestException('Не удалось создать пользователя. Проверьте правильность введенных данных.');
    }
  }

  findAll() {
    return this.prisma.users.findMany();
  }

  async findOne(email: string) {
    return await this.prisma.users.findUnique({where: {email}});
  }

  async findByLogin({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<CreateUserDto & { id: number }> {
    const user = await this.prisma.users.findUnique({where: {email}});

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const areEqual = await compare(password, user.password);

    if (!areEqual) {
      throw new NotFoundException('Invalid login or password');
    }

    return this._toUserDto(user);
  }

  async updateSessionToken(userId: number, token: string): Promise<void> {
    await this.prisma.users.update({
      where: {
        user_id: userId,
      },
      data: {
        currentToken: token,
      },
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    try {
      const updatedUser = await this.prisma.users.update({
        where: { user_id: id },
        data: updateUserDto,
      });
      return this._toUserDto(updatedUser);
    } catch (error) {
      console.error('Ошибка при обновлении пользователя:', error);
      throw new Error('Не удалось обновить пользователя.');
    }
  }

  async updatePassword(userId: number, hashedPassword: string) {
    try {
      await this.prisma.users.update({
        where: { user_id: userId },
        data: { password: hashedPassword }
      });
    } catch (error) {
      console.error('Ошибка при обновлении пароля:', error);
      throw new Error('Не удалось обновить пароль');
    }
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  private _toUserDto(user: any): CreateUserDto & { id: number } {
    const { user_id, first_name, last_name, email, phone_number, password } = user;
    return { id: user_id, first_name, last_name, email, phone_number, password };
  }
}
