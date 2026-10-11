import { Test, TestingModule } from '@nestjs/testing';
import { DetalleCompraController } from './detalle_compra.controller';

describe('DetalleCompraController', () => {
  let controller: DetalleCompraController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DetalleCompraController],
    }).compile();

    controller = module.get<DetalleCompraController>(DetalleCompraController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
