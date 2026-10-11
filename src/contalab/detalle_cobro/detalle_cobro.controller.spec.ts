import { Test, TestingModule } from '@nestjs/testing';
import { DetalleCobroController } from './detalle_cobro.controller';

describe('DetalleCobroController', () => {
  let controller: DetalleCobroController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DetalleCobroController],
    }).compile();

    controller = module.get<DetalleCobroController>(DetalleCobroController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
