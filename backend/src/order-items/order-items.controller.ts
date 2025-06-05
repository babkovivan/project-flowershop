import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { OrderItemsService } from './order-items.service';
import { CreateOrderItemDto } from './dto/create-order-item.dto';
import { UpdateOrderItemDto } from './dto/update-order-item.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('order-items')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard)
@Controller('order-items')
export class OrderItemsController {
  constructor(private readonly orderItemsService: OrderItemsService) {}

  @Post()
  @ApiOperation({ summary: 'Создать элемент заказа' })
  @ApiResponse({ status: 201, description: 'Элемент заказа успешно создан' })
  @ApiResponse({ status: 401, description: 'Не авторизован' })
  create(@Body() createOrderItemDto: CreateOrderItemDto) {
    return this.orderItemsService.create(createOrderItemDto);
  }

  @Get()
  @ApiOperation({ summary: 'Получить все элементы заказов' })
  @ApiResponse({ status: 200, description: 'Список элементов заказов' })
  @ApiResponse({ status: 401, description: 'Не авторизован' })
  findAll() {
    return this.orderItemsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Получить элемент заказа по ID' })
  @ApiResponse({ status: 200, description: 'Элемент заказа найден' })
  @ApiResponse({ status: 401, description: 'Не авторизован' })
  @ApiResponse({ status: 404, description: 'Элемент заказа не найден' })
  findOne(@Param('id') id: string) {
    return this.orderItemsService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Обновить элемент заказа' })
  @ApiResponse({ status: 200, description: 'Элемент заказа обновлен' })
  @ApiResponse({ status: 401, description: 'Не авторизован' })
  @ApiResponse({ status: 404, description: 'Элемент заказа не найден' })
  update(@Param('id') id: string, @Body() updateOrderItemDto: UpdateOrderItemDto) {
    return this.orderItemsService.update(+id, updateOrderItemDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Удалить элемент заказа' })
  @ApiResponse({ status: 200, description: 'Элемент заказа удален' })
  @ApiResponse({ status: 401, description: 'Не авторизован' })
  @ApiResponse({ status: 404, description: 'Элемент заказа не найден' })
  remove(@Param('id') id: string) {
    return this.orderItemsService.remove(+id);
  }
}
