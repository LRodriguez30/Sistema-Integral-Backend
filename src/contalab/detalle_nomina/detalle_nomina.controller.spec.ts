import { Test, TestingModule } from '@nestjs/testing';
import { DetalleNominaController } from './detalle_nomina.controller';

describe('DetalleNominaController', () => {
  let controller: DetalleNominaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DetalleNominaController],
    }).compile();

    controller = module.get<DetalleNominaController>(DetalleNominaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
