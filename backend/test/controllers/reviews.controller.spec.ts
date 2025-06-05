import { Test, TestingModule } from '@nestjs/testing';
import { ReviewsController } from '../../src/reviews/reviews.controller';
import { ReviewsService } from '../../src/reviews/reviews.service';
import { CreateReviewDto } from '../../src/reviews/dto/create-review.dto';
import { UpdateReviewDto } from '../../src/reviews/dto/update-review.dto';

describe('ReviewsController', () => {
  let controller: ReviewsController;
  let service: ReviewsService;

  const mockReviewsService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReviewsController],
      providers: [
        {
          provide: ReviewsService,
          useValue: mockReviewsService,
        },
      ],
    }).compile();

    controller = module.get<ReviewsController>(ReviewsController);
    service = module.get<ReviewsService>(ReviewsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a review', async () => {
      const createReviewDto: CreateReviewDto = {
        user_id: 1,
        comment: 'Great bouquet!',
        review_date: new Date(),
        rating: 5
      };

      mockReviewsService.create.mockResolvedValue(createReviewDto);

      const result = await controller.create(createReviewDto);
      expect(result).toEqual(createReviewDto);
      expect(mockReviewsService.create).toHaveBeenCalledWith(createReviewDto);
    });
  });

  describe('findAll', () => {
    it('should return array of reviews', async () => {
      const reviews = [
        { 
          id: 1, 
          user_id: 1,
          comment: 'Great bouquet!',
          review_date: new Date(),
          rating: 5
        },
        { 
          id: 2, 
          user_id: 2,
          comment: 'Beautiful flowers!',
          review_date: new Date(),
          rating: 4
        },
      ];

      mockReviewsService.findAll.mockResolvedValue(reviews);

      const result = await controller.findAll();
      expect(result).toEqual(reviews);
      expect(mockReviewsService.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a single review', async () => {
      const id = '1';
      const review = { 
        id: 1, 
        user_id: 1,
        comment: 'Great bouquet!',
        review_date: new Date(),
        rating: 5
      };

      mockReviewsService.findOne.mockResolvedValue(review);

      const result = await controller.findOne(id);
      expect(result).toEqual(review);
      expect(mockReviewsService.findOne).toHaveBeenCalledWith(1);
    });
  });

  describe('update', () => {
    it('should update a review', async () => {
      const id = '1';
      const updateReviewDto: UpdateReviewDto = {
        rating: 4,
        comment: 'Updated comment'
      };
      const updatedReview = { 
        id: 1, 
        user_id: 1,
        comment: 'Updated comment',
        review_date: new Date(),
        rating: 4
      };

      mockReviewsService.update.mockResolvedValue(updatedReview);

      const result = await controller.update(id, updateReviewDto);
      expect(result).toEqual(updatedReview);
      expect(mockReviewsService.update).toHaveBeenCalledWith(1, updateReviewDto);
    });
  });

  describe('remove', () => {
    it('should remove a review', async () => {
      const id = '1';
      const deletedReview = { 
        id: 1, 
        user_id: 1,
        comment: 'Great bouquet!',
        review_date: new Date(),
        rating: 5
      };

      mockReviewsService.remove.mockResolvedValue(deletedReview);

      const result = await controller.remove(id);
      expect(result).toEqual(deletedReview);
      expect(mockReviewsService.remove).toHaveBeenCalledWith(1);
    });
  });
}); 