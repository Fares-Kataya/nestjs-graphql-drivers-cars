import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { CarsService } from './cars.service';
import { Car } from './entities/car.entity';
import { CreateCarInput } from './dto/create-car.input';
import { UpdateCarInput } from './dto/update-car.input';
import { UsePipes, ValidationPipe } from '@nestjs/common';

@UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
@Resolver(() => Car)
export class CarsResolver {
    constructor(private readonly carsService: CarsService) { }

    @Mutation(() => Car, { name: 'createCar' })
    createCar(
        @Args('createCarInput') createCarInput: CreateCarInput,
    ): Promise<Car> {
        return this.carsService.create(createCarInput);
    }

    @Query(() => [Car], { name: 'cars' })
    findAll(): Promise<Car[]> {
        return this.carsService.findAll();
    }

    @Query(() => Car, { name: 'car', nullable: true })
    findOne(@Args('_id', { type: () => ID }) _id: string): Promise<Car | null> {
        return this.carsService.findOne(_id);
    }

    @Mutation(() => Car, { name: 'updateCar', nullable: true })
    updateCar(
        @Args('updateCarInput') updateCarInput: UpdateCarInput,
    ): Promise<Car | null> {
        return this.carsService.update(updateCarInput);
    }

    @Mutation(() => Car, { name: 'removeCar', nullable: true })
    removeCar(@Args('_id', { type: () => ID }) _id: string): Promise<Car | null> {
        return this.carsService.remove(_id);
    }
}
