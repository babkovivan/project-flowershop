import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { PrismaService } from '../src/prisma.service';

describe('BouquetsController (e2e)', () => {
  let app: INestApplication;
  let prismaService: PrismaService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    prismaService = app.get<PrismaService>(PrismaService);
    await app.init();
  });

  beforeEach(async () => {
    // Очистка базы данных перед каждым тестом
    await prismaService.bouquet.deleteMany();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('/bouquets (GET)', () => {
    it('should return an empty array of bouquets', () => {
      return request(app.getHttpServer())
        .get('/bouquets')
        .expect(200)
        .expect([]);
    });

    it('should return array of bouquets', async () => {
      const bouquet = await prismaService.bouquet.create({
        data: {
          name: 'Test Bouquet',
          price: 29.99,
          description: 'Test Description',
          image: 'test-image.jpg',
        },
      });

      return request(app.getHttpServer())
        .get('/bouquets')
        .expect(200)
        .expect([
          {
            id: bouquet.id,
            name: bouquet.name,
            price: bouquet.price,
            description: bouquet.description,
            image: bouquet.image,
          },
        ]);
    });
  });

  describe('/bouquets/:id (GET)', () => {
    it('should return a bouquet by id', async () => {
      const bouquet = await prismaService.bouquet.create({
        data: {
          name: 'Test Bouquet',
          price: 29.99,
          description: 'Test Description',
          image: 'test-image.jpg',
        },
      });

      return request(app.getHttpServer())
        .get(`/bouquets/${bouquet.id}`)
        .expect(200)
        .expect({
          id: bouquet.id,
          name: bouquet.name,
          price: bouquet.price,
          description: bouquet.description,
          image: bouquet.image,
        });
    });

    it('should return 404 when bouquet not found', () => {
      return request(app.getHttpServer())
        .get('/bouquets/999')
        .expect(404);
    });
  });
}); 