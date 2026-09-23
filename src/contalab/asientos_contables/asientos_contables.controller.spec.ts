import { Test, TestingModule } from '@nestjs/testing';
import { AsientosContablesController } from './asientos_contables.controller';

describe('AsientosContablesController', () => {
  let controller: AsientosContablesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AsientosContablesController],
    }).compile();

    controller = module.get<AsientosContablesController>(AsientosContablesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
