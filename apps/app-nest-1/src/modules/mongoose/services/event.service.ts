import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  Event,
  EventDocument,
  EventRawDocument,
} from '../schemas/event.schema';
import { CreateEventDto } from '../dtos/create-event.dto';

@Injectable()
export class EventService {
  constructor(
    @InjectModel(EventRawDocument.name) private eventModel: Model<Event>,
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
