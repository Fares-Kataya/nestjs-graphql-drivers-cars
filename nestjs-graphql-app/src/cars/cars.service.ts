import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Car as CarEntity } from '../cars/entities/car.entity';
import { Model } from 'mongoose';
import { Car, CarDocument } from './schemas/car.schema';
import { CreateCarInput } from './dto/create-car.input';
import { UpdateCarInput } from './dto/update-car.input';

@Injectable()
export class CarsService {
  constructor(@InjectModel(Car.name) private carModel: Model<CarDocument>) {}

  async create(createCarInput: CreateCarInput): Promise<CarEntity> {
    const createdCar = new this.carModel(createCarInput);
    return (await createdCar.save()) as CarEntity;
  }

  async findAll(): Promise<CarEntity[]> {
    return this.carModel.find().exec() as Promise<CarEntity[]>;
  }

  async findOne(_id: string): Promise<CarEntity | null> {
    return this.carModel.findById(_id).exec() as Promise<CarEntity | null>;
  }

  async update(updateCarInput: UpdateCarInput): Promise<CarEntity | null> {
    return this.carModel
      .findByIdAndUpdate(
        updateCarInput._id,
        { $set: updateCarInput },
        { new: true },
      )
      .exec() as Promise<CarEntity | null>;
  }

  async remove(_id: string): Promise<CarEntity | null> {
    return this.carModel
      .findByIdAndDelete(_id)
      .exec() as Promise<CarEntity | null>;
  }
}