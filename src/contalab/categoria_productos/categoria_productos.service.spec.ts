import { Test, TestingModule } from '@nestjs/testing';
import { CategoriaProductosService } from './categoria_productos.service';

describe('CategoriaProductosService', () => {
  let service: CategoriaProductosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CategoriaProductosService],
    }).compile();

    service = module.get<CategoriaProductosService>(CategoriaProductosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
