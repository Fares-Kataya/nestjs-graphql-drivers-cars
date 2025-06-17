import { Test, TestingModule } from '@nestjs/testing';
import { DriversResolver } from './drivers.resolver';

describe('DriversResolver', () => {
  let resolver: DriversResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DriversResolver],
    }).compile();

    resolver = module.get<DriversResolver>(DriversResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
