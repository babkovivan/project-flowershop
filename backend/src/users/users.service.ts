import { Injectable, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}
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
        password: hashedPassword
      },
    });

    return this._toUserDto(newUser);
  }catch (error: any) {
    console.error('Ошибка при создании пользователя:', error);
    throw new Error('Не удалось создать пользователя.'); 
  }}

  findAll() {
    return this.prisma.users.findMany();
  }
  

  async findOne(email: string) {
    return await this.prisma.users.findUnique({where: {email:email}})
  }

update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

    remove(id: number) {
    return `This action removes a #${id} user`;
  }
    private _toUserDto(user): CreateUserDto {
      const { first_name, last_name, email, phone_number, password } = user;
      return { first_name, last_name, email, phone_number, password };
    }
}
