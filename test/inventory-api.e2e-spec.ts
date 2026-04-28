import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { InventoryController } from '../src/inventory/inventory.controller';
import { InventoryService } from '../src/inventory/inventory.service';

describe('Inventory API integration tests', () => {
  let app: INestApplication;

  const mockInventoryService = {
    getItems: jest.fn().mockReturnValue([
      { id: 1, name: 'Potion', quantity: 5 },
      { id: 2, name: 'Sword', quantity: 1 },
    ]),
  };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [InventoryController],
      providers: [
        {
          provide: InventoryService,
          useValue: mockInventoryService,
        },
      ],
    }).compile();

    app = moduleFixture.createNestApplication();

    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        transform: true,
      }),
    );

    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('GET /inventory should return inventory items', () => {
    return request(app.getHttpServer())
      .get('/inventory')
      .expect(200)
      .expect([
        { id: 1, name: 'Potion', quantity: 5 },
        { id: 2, name: 'Sword', quantity: 1 },
      ]);
  });

  it('POST /inventory should create an item when data is valid', () => {
    return request(app.getHttpServer())
      .post('/inventory')
      .send({
        name: 'Shield',
        quantity: 2,
      })
      .expect(201)
      .expect({
        message: 'Item created',
        item: {
          name: 'Shield',
          quantity: 2,
        },
      });
  });

  it('POST /inventory should fail validation when data is invalid', () => {
    return request(app.getHttpServer())
      .post('/inventory')
      .send({
        name: '',
        quantity: 0,
      })
      .expect(400);
  });

  it('GET /inventory/protected should allow access with test JWT', () => {
    return request(app.getHttpServer())
      .get('/inventory/protected')
      .set('Authorization', 'Bearer test-jwt-token')
      .expect(200)
      .expect({
        message: 'Access granted',
      });
  });

  it('GET /inventory/protected should reject missing JWT', () => {
    return request(app.getHttpServer())
      .get('/inventory/protected')
      .expect(401);
  });
});