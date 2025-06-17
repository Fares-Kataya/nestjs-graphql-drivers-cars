import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CarDocument = Car & Document;

@Schema()
export class Car {
  _id: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  model: string;
}

export const CarSchema = SchemaFactory.createForClass(Car);
