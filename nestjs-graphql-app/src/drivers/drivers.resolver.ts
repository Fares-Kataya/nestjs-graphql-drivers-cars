import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { DriversService } from './drivers.service';
import { Driver } from './entities/driver.entity';
import { CreateDriverInput } from './dto/create-driver.input';
import { UpdateDriverInput } from './dto/update-driver.input';
import { UsePipes, ValidationPipe } from '@nestjs/common';

@UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
@Resolver(() => Driver)
export class DriversResolver {
  constructor(private readonly driversService: DriversService) {}

  @Mutation(() => Driver, { name: 'createDriver' })
  createDriver(
    @Args('createDriverInput') createDriverInput: CreateDriverInput,
  ): Promise<Driver> {
    return this.driversService.create(createDriverInput);
  }

  @Query(() => [Driver], { name: 'drivers' })
  findAll(): Promise<Driver[]> {
    return this.driversService.findAll();
  }

  @Query(() => Driver, { name: 'driver', nullable: true })
  findOne(
    @Args('_id', { type: () => ID }) _id: string,
  ): Promise<Driver | null> {
    return this.driversService.findOne(_id);
  }

  @Mutation(() => Driver, { name: 'updateDriver', nullable: true })
  updateDriver(
    @Args('updateDriverInput') updateDriverInput: UpdateDriverInput,
  ): Promise<Driver | null> {
    return this.driversService.update(updateDriverInput);
  }

  @Mutation(() => Driver, { name: 'removeDriver', nullable: true })
  removeDriver(
    @Args('_id', { type: () => ID }) _id: string,
  ): Promise<Driver | null> {
    return this.driversService.remove(_id);
  }

  @Mutation(() => Driver, { name: 'addCarToDriver' })
  async addCarToDriver(
    @Args('driverId', { type: () => ID }) driverId: string,
    @Args('carId', { type: () => ID }) carId: string,
  ): Promise<Driver> {
    return this.driversService.addCarToDriver(driverId, carId);
  }
}
