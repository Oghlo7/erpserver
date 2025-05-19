import { Test, TestingModule } from '@nestjs/testing';
import { ProductcatController } from './productcat.controller';

describe('ProductcatController', () => {
  let controller: ProductcatController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductcatController],
    }).compile();

    controller = module.get<ProductcatController>(ProductcatController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
