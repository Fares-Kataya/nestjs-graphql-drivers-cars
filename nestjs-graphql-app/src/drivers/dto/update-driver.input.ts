import { InputType, Field, PartialType } from '@nestjs/graphql';
import { CreateDriverInput } from './create-driver.input';
import { IsMongoId } from 'class-validator';

@InputType()
export class UpdateDriverInput extends PartialType(CreateDriverInput) {
  @Field()
  @IsMongoId()
  _id: string;
}
