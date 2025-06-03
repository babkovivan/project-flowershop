import { Test, TestingModule } from '@nestjs/testing';
import { ReviewsService } from '../src/reviews/reviews.service';
import { PrismaService } from '../src/prisma.service';
import { CreateReviewDto } from '../src/reviews/dto/create-review.dto';

describe('ReviewsService', () => {
  let service: ReviewsService;
  let prismaService: PrismaService;

  const mockPrismaService = {
    reviews: {
      findMany: jest.fn(),
      findUnique: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReviewsService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<ReviewsService>(ReviewsService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new review', async () => {
      const createReviewDto: CreateReviewDto = {
        user_id: 1,
        comment: 'Great bouquet!',
        review_date: new Date('2024-01-20'),
        rating: 5
      };

      const expectedReview = {
        id: 1,
        ...createReviewDto
      };

      mockPrismaService.reviews.create.mockResolvedValue(expectedReview);

      const result = await service.create(createReviewDto);
      expect(result).toEqual(createReviewDto);
      expect(mockPrismaService.reviews.create).toHaveBeenCalledWith({
        data: {
          user_id: createReviewDto.user_id,
          comment: createReviewDto.comment,
          review_date: createReviewDto.review_date,
          rating: createReviewDto.rating
        },
      });
    });

    it('should handle errors when creating review', async () => {
      const createReviewDto: CreateReviewDto = {
        user_id: 1,
        comment: 'Great bouquet!',
        review_date: new Date('2024-01-20'),
        rating: 5
      };

      mockPrismaService.reviews.create.mockRejectedValue(new Error('Database error'));

      await expect(service.create(createReviewDto)).rejects.toThrow('Не удалось создать отзыв.');
    });
  });

  describe('findAll', () => {
    it('should return array of reviews', async () => {
      const expectedReviews = [
        { id: 1, user_id: 1, comment: 'Great bouquet!', review_date: new Date(), rating: 5 },
        { id: 2, user_id: 2, comment: 'Beautiful flowers!', review_date: new Date(), rating: 4 },
      ];

      mockPrismaService.reviews.findMany.mockResolvedValue(expectedReviews);

      const result = await service.findAll();
      expect(result).toEqual(expectedReviews);
      expect(mockPrismaService.reviews.findMany).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a message with the review id', async () => {
      const result = await service.findOne(1);
      expect(result).toBe('This action returns a #1 review');
    });
  });
}); 