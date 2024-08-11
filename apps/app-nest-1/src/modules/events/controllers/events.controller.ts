import { Body, Controller, Get, Post } from '@nestjs/common';
import { EventsService } from '../services/events.service';
import { EventDocument } from '../schemas/event.schema';
import { CreateEventDto } from '../dtos/create-event.dto';

@Controller({
  path: 'events',
})
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Post()
  create(@Body() createEventDto: CreateEventDto): Promise<EventDocument> {
    return this.eventsService.create(createEventDto);
  }

  @Get()
  findAll(): Promise<EventDocument[]> {
    return this.eventsService.findAll();
  }
}
