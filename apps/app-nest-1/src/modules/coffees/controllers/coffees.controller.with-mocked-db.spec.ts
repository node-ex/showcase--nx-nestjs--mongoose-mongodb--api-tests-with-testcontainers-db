import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, Module } from '@nestjs/common';
import request from 'supertest';
import { CoffeesModule, _mongooseModuleForFeature } from '../coffees.module';
import { CoffeesService } from '../services/coffees.service';
import { MongooseModule } from '../../mongoose/mongoose.module';

@Module({})
export class MockModule {}

describe('CoffeesController', () => {
  let app: INestApplication;

  beforeEach(async () => {
    /**
     * https://docs.nestjs.com/fundamentals/testing#end-to-end-testing
     */
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [CoffeesModule],
    })
      .overrideModule(MongooseModule)
      .useModule(MockModule)
      .overrideModule(_mongooseModuleForFeature)
      .useModule(MockModule)
      .overrideProvider(CoffeesService)
      .useValue({
        findAll: jest.fn().mockResolvedValue([]),
        create: jest.fn().mockResolvedValue({}),
      })
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('GET /coffees', async () => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const result = await request(app.getHttpServer())
      .get('/coffees')
      .expect(200);

    expect(result.body).toEqual([]);
  });
});
