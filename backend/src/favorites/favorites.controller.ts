import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { UpdateFavoriteDto } from './dto/update-favorite.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('favorites')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard)
@Controller('favorites')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Post()
  @ApiOperation({ summary: 'Добавить букет в избранное' })
  @ApiResponse({ status: 201, description: 'Букет успешно добавлен в избранное' })
  @ApiResponse({ status: 401, description: 'Не авторизован' })
  create(@Body() createFavoriteDto: CreateFavoriteDto) {
    return this.favoritesService.create(createFavoriteDto);
  }

  @Get()
  @ApiOperation({ summary: 'Получить все избранные букеты' })
  @ApiResponse({ status: 200, description: 'Список избранных букетов' })
  @ApiResponse({ status: 401, description: 'Не авторизован' })
  findAll() {
    return this.favoritesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Получить избранный букет по ID' })
  @ApiResponse({ status: 200, description: 'Избранный букет найден' })
  @ApiResponse({ status: 401, description: 'Не авторизован' })
  @ApiResponse({ status: 404, description: 'Избранный букет не найден' })
  findOne(@Param('id') id: string) {
    return this.favoritesService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Обновить избранный букет' })
  @ApiResponse({ status: 200, description: 'Избранный букет обновлен' })
  @ApiResponse({ status: 401, description: 'Не авторизован' })
  @ApiResponse({ status: 404, description: 'Избранный букет не найден' })
  update(@Param('id') id: string, @Body() updateFavoriteDto: UpdateFavoriteDto) {
    return this.favoritesService.update(+id, updateFavoriteDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Удалить букет из избранного' })
  @ApiResponse({ status: 200, description: 'Букет удален из избранного' })
  @ApiResponse({ status: 401, description: 'Не авторизован' })
  @ApiResponse({ status: 404, description: 'Избранный букет не найден' })
  remove(@Param('id') id: string) {
    return this.favoritesService.remove(+id);
  }
}
