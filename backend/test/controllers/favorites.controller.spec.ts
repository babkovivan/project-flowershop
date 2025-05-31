import { Test, TestingModule } from '@nestjs/testing';
import { FavoritesController } from '../../src/favorites/favorites.controller';
import { FavoritesService } from '../../src/favorites/favorites.service';
import { CreateFavoriteDto } from '../../src/favorites/dto/create-favorite.dto';
import { UpdateFavoriteDto } from '../../src/favorites/dto/update-favorite.dto';

describe('FavoritesController', () => {
  let controller: FavoritesController;
  let service: FavoritesService;

  const mockFavoritesService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FavoritesController],
      providers: [
        {
          provide: FavoritesService,
          useValue: mockFavoritesService,
        },
      ],
    }).compile();

    controller = module.get<FavoritesController>(FavoritesController);
    service = module.get<FavoritesService>(FavoritesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a favorite', async () => {
      const createFavoriteDto: CreateFavoriteDto = {
        user_id: 1,
        bouquet_id: 2,
        added_date: new Date(),
      };

      mockFavoritesService.create.mockResolvedValue(createFavoriteDto);

      const result = await controller.create(createFavoriteDto);
      expect(result).toEqual(createFavoriteDto);
      expect(mockFavoritesService.create).toHaveBeenCalledWith(createFavoriteDto);
    });
  });

  describe('findAll', () => {
    it('should return array of favorites', async () => {
      const favorites = [
        { id: 1, user_id: 1, bouquet_id: 2, added_date: new Date() },
        { id: 2, user_id: 1, bouquet_id: 3, added_date: new Date() },
      ];

      mockFavoritesService.findAll.mockResolvedValue(favorites);

      const result = await controller.findAll();
      expect(result).toEqual(favorites);
      expect(mockFavoritesService.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a single favorite', async () => {
      const id = '1';
      const favorite = { id: 1, user_id: 1, bouquet_id: 2, added_date: new Date() };

      mockFavoritesService.findOne.mockResolvedValue(favorite);

      const result = await controller.findOne(id);
      expect(result).toEqual(favorite);
      expect(mockFavoritesService.findOne).toHaveBeenCalledWith(1);
    });
  });

  describe('update', () => {
    it('should update a favorite', async () => {
      const id = '1';
      const updateFavoriteDto: UpdateFavoriteDto = {
        bouquet_id: 3,
      };
      const updatedFavorite = { 
        id: 1, 
        user_id: 1, 
        bouquet_id: 3, 
        added_date: new Date() 
      };

      mockFavoritesService.update.mockResolvedValue(updatedFavorite);

      const result = await controller.update(id, updateFavoriteDto);
      expect(result).toEqual(updatedFavorite);
      expect(mockFavoritesService.update).toHaveBeenCalledWith(1, updateFavoriteDto);
    });
  });

  describe('remove', () => {
    it('should remove a favorite', async () => {
      const id = '1';
      const deletedFavorite = { 
        id: 1, 
        user_id: 1, 
        bouquet_id: 2, 
        added_date: new Date() 
      };

      mockFavoritesService.remove.mockResolvedValue(deletedFavorite);

      const result = await controller.remove(id);
      expect(result).toEqual(deletedFavorite);
      expect(mockFavoritesService.remove).toHaveBeenCalledWith(1);
    });
  });
}); 