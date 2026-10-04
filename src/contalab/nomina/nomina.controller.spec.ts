import { Test, TestingModule } from '@nestjs/testing';
import { NominaController } from './nomina.controller';

describe('NominaController', () => {
  let controller: NominaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NominaController],
    }).compile();

    controller = module.get<NominaController>(NominaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
