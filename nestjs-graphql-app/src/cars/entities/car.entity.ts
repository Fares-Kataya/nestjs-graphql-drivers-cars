import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class Car {
  @Field(() => ID)
  _id: string;

  @Field()
  name: string;

  @Field()
  model: string;
}
