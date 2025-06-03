import { Test, TestingModule } from '@nestjs/testing';
import { CategoriesController } from '../../src/categories/categories.controller';
import { CategoriesService } from '../../src/categories/categories.service';
import { CreateCategoryDto } from '../../src/categories/dto/create-category.dto';
import { UpdateCategoryDto } from '../../src/categories/dto/update-category.dto';

describe('CategoriesController', () => {
  let controller: CategoriesController;
  let service: CategoriesService;

  const mockCategoriesService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoriesController],
      providers: [
        {
          provide: CategoriesService,
          useValue: mockCategoriesService,
        },
      ],
    }).compile();

    controller = module.get<CategoriesController>(CategoriesController);
    service = module.get<CategoriesService>(CategoriesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a category', async () => {
      const createCategoryDto: CreateCategoryDto = {
        name: 'Wedding Bouquets',
      };

      mockCategoriesService.create.mockResolvedValue(createCategoryDto);

      const result = await controller.create(createCategoryDto);
      expect(result).toEqual(createCategoryDto);
      expect(mockCategoriesService.create).toHaveBeenCalledWith(createCategoryDto);
    });
  });

  describe('findAll', () => {
    it('should return array of categories', async () => {
      const categories = [
        { id: 1, name: 'Wedding Bouquets' },
        { id: 2, name: 'Birthday Bouquets' },
      ];

      mockCategoriesService.findAll.mockResolvedValue(categories);

      const result = await controller.findAll();
      expect(result).toEqual(categories);
      expect(mockCategoriesService.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a single category', async () => {
      const id = '1';
      const category = { id: 1, name: 'Wedding Bouquets' };

      mockCategoriesService.findOne.mockResolvedValue(category);

      const result = await controller.findOne(id);
      expect(result).toEqual(category);
      expect(mockCategoriesService.findOne).toHaveBeenCalledWith(1);
    });
  });

  describe('update', () => {
    it('should update a category', async () => {
      const id = '1';
      const updateCategoryDto: UpdateCategoryDto = {
        name: 'Updated Wedding Bouquets',
      };
      const updatedCategory = { id: 1, ...updateCategoryDto };

      mockCategoriesService.update.mockResolvedValue(updatedCategory);

      const result = await controller.update(id, updateCategoryDto);
      expect(result).toEqual(updatedCategory);
      expect(mockCategoriesService.update).toHaveBeenCalledWith(1, updateCategoryDto);
    });
  });

  describe('remove', () => {
    it('should remove a category', async () => {
      const id = '1';
      const deletedCategory = { id: 1, name: 'Wedding Bouquets' };

      mockCategoriesService.remove.mockResolvedValue(deletedCategory);

      const result = await controller.remove(id);
      expect(result).toEqual(deletedCategory);
      expect(mockCategoriesService.remove).toHaveBeenCalledWith(1);
    });
  });
}); 