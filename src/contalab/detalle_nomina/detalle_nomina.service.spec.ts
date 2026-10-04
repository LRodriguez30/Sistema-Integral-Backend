import { Test, TestingModule } from '@nestjs/testing';
import { DetalleNominaService } from './detalle_nomina.service';

describe('DetalleNominaService', () => {
  let service: DetalleNominaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DetalleNominaService],
    }).compile();

    service = module.get<DetalleNominaService>(DetalleNominaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
