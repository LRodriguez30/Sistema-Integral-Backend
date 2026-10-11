import { Test, TestingModule } from '@nestjs/testing';
import { DetalleCobroService } from './detalle_cobro.service';

describe('DetalleCobroService', () => {
  let service: DetalleCobroService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DetalleCobroService],
    }).compile();

    service = module.get<DetalleCobroService>(DetalleCobroService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
