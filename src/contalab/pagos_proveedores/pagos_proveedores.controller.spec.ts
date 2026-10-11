import { Test, TestingModule } from '@nestjs/testing';
import { PagosProveedoresController } from './pagos_proveedores.controller';

describe('PagosProveedoresController', () => {
  let controller: PagosProveedoresController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PagosProveedoresController],
    }).compile();

    controller = module.get<PagosProveedoresController>(PagosProveedoresController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
