import { Injectable, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    private JwtService: JwtService,
  ) {}

  async create(user: CreateUserDto): Promise<CreateUserDto> {
    const { first_name, last_name, email, phone_number, password } = user;
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
      const newUser = await this.prisma.users.create({
        data: {
          first_name,
          last_name,
          email,
          phone_number,
          password: hashedPassword,
        },
      });
      const token = this.JwtService.sign({ email: email });
      return this._toUserDto(newUser);
    } catch (error: any) {
      if (error.code === 'P2002') {
        throw new Error('Пользователь с таким email уже существует');
      }
      console.error('Ошибка при создании пользователя:', error);
      throw new Error('Не удалось создать пользователя.');
    }
  }

  findAll() {
    return this.prisma.users.findMany();
  }

  async findOne(email: string) {
    return await this.prisma.users.findUnique({ where: { email: email } });
  }

  async findByLogin({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<CreateUserDto> {
    const user = await this.prisma.users.findUnique({ where: { email } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const areEqual = await compare(password, user.password);

    if (!areEqual) {
      throw new NotFoundException('Invalid login or password');
    }

    return this._toUserDto(user);
  }

  async updateSessionToken(userId: number, token: string | null): Promise<void> {
    await this.prisma.users.update({
      where: {
        user_id: userId,
      },
      data: {
        session_token: token,
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

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  private _toUserDto(user): CreateUserDto {
    const { user_id, first_name, last_name, email, phone_number, password } = user;
    return { id: user_id, first_name, last_name, email, phone_number, password };
  }
}
