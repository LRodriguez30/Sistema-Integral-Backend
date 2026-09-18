import { Test, TestingModule } from '@nestjs/testing';
import { CatalogoCuentasController } from './catalogo_cuentas.controller';

describe('CatalogoCuentasController', () => {
  let controller: CatalogoCuentasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CatalogoCuentasController],
    }).compile();

    controller = module.get<CatalogoCuentasController>(CatalogoCuentasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
