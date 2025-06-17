import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DriversService } from './drivers.service';
import { DriversResolver } from './drivers.resolver';
import { Driver, DriverSchema } from './schemas/driver.schema';
import { CarsModule } from '../cars/cars.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Driver.name, schema: DriverSchema }]),
    CarsModule,
  ],
  providers: [DriversResolver, DriversService],
})
export class DriversModule {}
