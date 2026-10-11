import { Test, TestingModule } from '@nestjs/testing';
import { CategoriaProductosController } from './categoria_productos.controller';

describe('CategoriaProductosController', () => {
  let controller: CategoriaProductosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoriaProductosController],
    }).compile();

    controller = module.get<CategoriaProductosController>(CategoriaProductosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
