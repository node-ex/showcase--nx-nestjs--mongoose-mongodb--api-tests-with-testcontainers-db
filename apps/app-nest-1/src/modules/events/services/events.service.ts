import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  Event,
  EVENT_SCHEMA_TOKEN,
  EventDocument,
} from '../schemas/event.schema';
import { CreateEventDto } from '../dtos/create-event.dto';

@Injectable()
export class EventsService {
  constructor(
    @InjectModel(EVENT_SCHEMA_TOKEN) private eventModel: Model<Event>,
  ) {}

  async create(createEventDto: CreateEventDto): Promise<EventDocument> {
    const event = new this.eventModel(createEventDto);
    // await this.eventModel.create(createEventDto);

    return event.save();
  }

  async findAll(): Promise<EventDocument[]> {
    return this.eventModel.find().exec();
  }
}
