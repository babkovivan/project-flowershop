import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ReviewsService {
  constructor(private prisma: PrismaService) {}
  
  async create(review: CreateReviewDto): Promise<CreateReviewDto> {
    const { user_id, comment, review_date, rating } = review;
    try {
    const newReview = await this.prisma.reviews.create({
      data: {
        user_id,
        comment,
        review_date,
        rating
      },
    });

    return this._toReviewDto(newReview);
  }catch (error: any) {
    console.error('Ошибка при создании отзыва:', error);
    throw new Error('Не удалось создать отзыв.'); 
  }}

  findAll() {
    return this.prisma.reviews.findMany();;
  }

  async findOne(id: number) {
    const review = await this.prisma.reviews.findUnique({
      where: { reviews_id: id },
    });

    if (!review) {
      throw new NotFoundException(`Отзыв с ID ${id} не найден`);
    }

    return review;
  }

  async update(id: number, updateReviewDto: UpdateReviewDto) {
    try {
      const review = await this.prisma.reviews.update({
        where: { reviews_id: id },
        data: updateReviewDto,
      });

      if (!review) {
        throw new NotFoundException(`Отзыв с ID ${id} не найден`);
      }

      return this._toReviewDto(review);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      console.error('Ошибка при обновлении отзыва:', error);
      throw new Error('Не удалось обновить отзыв.');
    }
  }

  async remove(id: number) {
    try {
      const review = await this.prisma.reviews.delete({
        where: { reviews_id: id },
      });

      if (!review) {
        throw new NotFoundException(`Отзыв с ID ${id} не найден`);
      }

      return { message: 'Отзыв успешно удален' };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      console.error('Ошибка при удалении отзыва:', error);
      throw new Error('Не удалось удалить отзыв.');
    }
  }
    private _toReviewDto(review): CreateReviewDto {
      const { user_id, comment, review_date, rating } = review;
      return { user_id, comment, review_date, rating };
    }
}
