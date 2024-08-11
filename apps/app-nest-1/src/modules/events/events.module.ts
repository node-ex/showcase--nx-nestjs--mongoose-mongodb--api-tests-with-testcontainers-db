import { Module } from '@nestjs/common';
import { MongooseModule as _MongooseModule } from '@nestjs/mongoose';
import { EVENT_SCHEMA_TOKEN, EventSchema } from './schemas/event.schema';
import { EventsController } from './controllers/events.controller';
import { EventsService } from './services/events.service';
import { MongooseModule } from '../mongoose/mongoose.module';

export const _mongooseModuleForFeature = _MongooseModule.forFeature([
  { name: EVENT_SCHEMA_TOKEN, schema: EventSchema },
]);

@Module({
  imports: [MongooseModule, _mongooseModuleForFeature],
  controllers: [EventsController],
  providers: [EventsService],
})
export class EventsModule {}
