import { Test, TestingModule } from '@nestjs/testing';
import { ExpenseCatService } from './expensecat.service';

describe('ExpenseCatService', () => {
  let service: ExpenseCatService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExpenseCatService],
    }).compile();

    service = module.get<ExpenseCatService>(ExpenseCatService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
