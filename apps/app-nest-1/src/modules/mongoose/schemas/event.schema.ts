import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { type HydratedDocument, SchemaTypes } from 'mongoose';

export interface Event {
  type: string;
  name: string;
  payload: Record<string, any>;
}

@Schema({
  collection: 'events',
})
export class EventRawDocument implements Event {
  @Prop()
  type!: string;

  @Prop({ index: true })
  name!: string;

  @Prop({ type: SchemaTypes.Mixed })
  payload!: Record<string, any>;
}

export const EventSchema = SchemaFactory.createForClass(EventRawDocument);
// 1 -> Ascending, -1 -> Descending
EventSchema.index({ name: 1, type: -1 });

export type EventDocument = HydratedDocument<Event>;
