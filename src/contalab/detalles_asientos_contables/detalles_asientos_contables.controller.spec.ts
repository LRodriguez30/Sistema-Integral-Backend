import { Test, TestingModule } from '@nestjs/testing';
import { DetallesAsientosContablesController } from './detalles_asientos_contables.controller';

describe('DetallesAsientosContablesController', () => {
  let controller: DetallesAsientosContablesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DetallesAsientosContablesController],
    }).compile();

    controller = module.get<DetallesAsientosContablesController>(DetallesAsientosContablesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
