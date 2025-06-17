import { InputType, Field, PartialType } from '@nestjs/graphql';
import { CreateCarInput } from './create-car.input';
import { IsMongoId } from 'class-validator';

@InputType()
export class UpdateCarInput extends PartialType(CreateCarInput) {
  @Field()
  @IsMongoId()
  _id: string;
}
