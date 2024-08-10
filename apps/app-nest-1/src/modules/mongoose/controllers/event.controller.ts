import { Body, Controller, Get, Post } from '@nestjs/common';
import { EventService } from '../services/event.service';
import { EventDocument } from '../schemas/event.schema';
import { CreateEventDto } from '../dtos/create-event.dto';

@Controller({
  path: 'mongoose/event',
})
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Post()
  create(@Body() createEventDto: CreateEventDto): Promise<EventDocument> {
    return this.eventService.create(createEventDto);
  }

  @Get()
  findAll(): Promise<EventDocument[]> {
    return this.eventService.findAll();
  }
}
