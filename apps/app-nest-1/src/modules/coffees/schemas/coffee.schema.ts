import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import type { HydratedDocument } from 'mongoose';

export interface Coffee {
  name: string;
  brand: string;
  recommendations: number;
  flavors: string[];
}

@Schema({
  collection: 'coffees',
})
export class CoffeeRawDocument implements Coffee {
  @Prop()
  name!: string;

  @Prop()
  brand!: string;

  @Prop({ default: 0 })
  recommendations!: number;

  @Prop({ type: [String] })
  flavors!: string[];
}

export const CoffeeSchema = SchemaFactory.createForClass(CoffeeRawDocument);
export type CoffeeDocument = HydratedDocument<CoffeeRawDocument>;
