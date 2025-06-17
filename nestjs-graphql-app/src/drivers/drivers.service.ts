import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Driver, DriverDocument } from './schemas/driver.schema';
import { CreateDriverInput } from './dto/create-driver.input';
import { UpdateDriverInput } from './dto/update-driver.input';
import { CarsService } from '../cars/cars.service';
import { Car } from 'src/cars/schemas/car.schema';
import { Driver as DriverEntity } from '../drivers/entities/driver.entity';
import { Car as CarEntity } from '../cars/entities/car.entity';

@Injectable()
export class DriversService {
  constructor(
    @InjectModel(Driver.name) private driverModel: Model<DriverDocument>,
    private readonly carsService: CarsService,
  ) {}

  async create(createDriverInput: CreateDriverInput): Promise<DriverEntity> {
    const createdDriver = new this.driverModel(createDriverInput);
    return (await createdDriver.save()) as DriverEntity;
  }

  async findAll(): Promise<DriverEntity[]> {
    return this.driverModel.find().populate('cars').exec() as Promise<
      DriverEntity[]
    >;
  }

  async findOne(_id: string): Promise<DriverEntity | null> {
    return this.driverModel
      .findById(_id)
      .populate('cars')
      .exec() as Promise<DriverEntity | null>;
  }

  async update(
    updateDriverInput: UpdateDriverInput,
  ): Promise<DriverEntity | null> {
    return this.driverModel
      .findByIdAndUpdate(
        updateDriverInput._id,
        { $set: updateDriverInput },
        { new: true },
      )
      .exec() as Promise<DriverEntity | null>;
  }

  async remove(_id: string): Promise<DriverEntity | null> {
    return this.driverModel
      .findByIdAndDelete(_id)
      .exec() as Promise<DriverEntity | null>;
  }

  async addCarToDriver(driverId: string, carId: string): Promise<DriverEntity> {
    const driver = await this.driverModel.findById(driverId);
    if (!driver) {
      throw new NotFoundException(`Driver with ID "${driverId}" not found.`);
    }

    const car = await this.carsService.findOne(carId);
    if (!car) {
      throw new NotFoundException(`Car with ID "${carId}" not found.`);
    }

    if (
      driver.cars.some(
        (existingCar: Car) => existingCar._id!.toString() === carId,
      )
    ) {
      throw new Error(
        `Car with ID "${carId}" is already associated with driver "${driverId}".`,
      );
    }

    if (car._id) {
      driver.cars.push(car._id as any);
    } else {
      throw new Error(`Car with ID "${carId}" has no _id.`);
    }

    await driver.save();
    const updatedDriver = await this.driverModel
      .findById(driverId)
      .populate('cars')
      .exec();
    return updatedDriver as DriverEntity;
  }
}