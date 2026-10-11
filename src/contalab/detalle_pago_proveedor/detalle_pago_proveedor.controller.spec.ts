import { Test, TestingModule } from '@nestjs/testing';
import { DetallePagoProveedorController } from './detalle_pago_proveedor.controller';

describe('DetallePagoProveedorController', () => {
  let controller: DetallePagoProveedorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DetallePagoProveedorController],
    }).compile();

    controller = module.get<DetallePagoProveedorController>(DetallePagoProveedorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
