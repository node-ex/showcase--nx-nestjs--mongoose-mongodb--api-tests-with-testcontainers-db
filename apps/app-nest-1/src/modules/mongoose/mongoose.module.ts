import { CoffeeController } from './controllers/coffee.controller';
import { CoffeeService } from './services/coffee.service';
import { Module } from '@nestjs/common';
import { MongooseModule as _MongooseModule } from '@nestjs/mongoose';
import { CoffeeRawDocument, CoffeeSchema } from './schemas/coffee.schema';
import { EventRawDocument, EventSchema } from './schemas/event.schema';
import { EventController } from './controllers/event.controller';
import { EventService } from './services/event.service';

@Module({
  imports: [
    _MongooseModule.forRoot('mongodb://127.0.0.1:27018/nest'),
    _MongooseModule.forFeature([
      { name: CoffeeRawDocument.name, schema: CoffeeSchema },
      { name: EventRawDocument.name, schema: EventSchema },
    ]),
  ],
  controllers: [CoffeeController, EventController],
  providers: [CoffeeService, EventService],
})
export class MongooseModule {}
