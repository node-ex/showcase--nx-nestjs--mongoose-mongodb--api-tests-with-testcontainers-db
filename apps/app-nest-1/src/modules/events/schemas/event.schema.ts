import { type HydratedDocument, Schema } from 'mongoose';

export const EVENT_SCHEMA_TOKEN = 'Event';

export interface Event {
  type: string;
  name: string;
  payload: Record<string, any>;
}

export const EventSchema = new Schema<Event>(
  {
    type: { type: String, required: true },
    name: { type: String, required: true },
    payload: { type: Schema.Types.Mixed, required: true },
  },
  { collection: 'events' },
);
// 1 -> Ascending, -1 -> Descending
EventSchema.index({ name: 1, type: -1 });

export type EventDocument = HydratedDocument<Event>;
