import { Test, TestingModule } from '@nestjs/testing';
import { DetallesAsientosContablesService } from './detalles_asientos_contables.service';

describe('DetallesAsientosContablesService', () => {
  let service: DetallesAsientosContablesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DetallesAsientosContablesService],
    }).compile();

    service = module.get<DetallesAsientosContablesService>(DetallesAsientosContablesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
