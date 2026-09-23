import { Test, TestingModule } from '@nestjs/testing';
import { AsientosContablesService } from './asientos_contables.service';

describe('AsientosContablesService', () => {
  let service: AsientosContablesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AsientosContablesService],
    }).compile();

    service = module.get<AsientosContablesService>(AsientosContablesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
