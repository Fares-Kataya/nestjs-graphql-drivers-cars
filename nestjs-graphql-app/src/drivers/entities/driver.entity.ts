import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Car } from '../../cars/entities/car.entity';

@ObjectType()
export class Driver {
  @Field(() => ID)
  _id: string;

  @Field()
  name: string;

  @Field()
  age: number;

  @Field(() => [Car])
  cars: Car[];
}
