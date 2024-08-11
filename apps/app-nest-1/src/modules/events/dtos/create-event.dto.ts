import { Event } from '../schemas/event.schema';

export class CreateEventDto implements Event {
  type!: string;
  name!: string;
  payload!: Record<string, any>;
}
