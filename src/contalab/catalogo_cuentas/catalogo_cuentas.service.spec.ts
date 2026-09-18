import { Test, TestingModule } from '@nestjs/testing';
import { CatalogoCuentasService } from './catalogo_cuentas.service';

describe('CatalogoCuentasService', () => {
  let service: CatalogoCuentasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CatalogoCuentasService],
    }).compile();

    service = module.get<CatalogoCuentasService>(CatalogoCuentasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
