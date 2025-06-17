import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Car } from '../../cars/schemas/car.schema';

export type DriverDocument = Driver & Document;

@Schema()
export class Driver {
  _id: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  age: number;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Car' }] })
  cars: Car[];
}

export const DriverSchema = SchemaFactory.createForClass(Driver);
