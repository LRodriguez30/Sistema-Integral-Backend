import { Test, TestingModule } from '@nestjs/testing';
import { DetallePagoProveedorService } from './detalle_pago_proveedor.service';

describe('DetallePagoProveedorService', () => {
  let service: DetallePagoProveedorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DetallePagoProveedorService],
    }).compile();

    service = module.get<DetallePagoProveedorService>(DetallePagoProveedorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
