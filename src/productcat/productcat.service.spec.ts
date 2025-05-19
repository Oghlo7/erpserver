import { Test, TestingModule } from '@nestjs/testing';
import { ProductcatService } from './productcat.service';

describe('ProductcatService', () => {
  let service: ProductcatService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductcatService],
    }).compile();

    service = module.get<ProductcatService>(ProductcatService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
