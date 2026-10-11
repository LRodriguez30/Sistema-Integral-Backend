import { Test, TestingModule } from '@nestjs/testing';
import { PagosProveedoresService } from './pagos_proveedores.service';

describe('PagosProveedoresService', () => {
  let service: PagosProveedoresService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PagosProveedoresService],
    }).compile();

    service = module.get<PagosProveedoresService>(PagosProveedoresService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
