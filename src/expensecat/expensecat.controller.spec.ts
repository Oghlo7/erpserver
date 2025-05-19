import { Test, TestingModule } from '@nestjs/testing';
import { ExpenseCatController } from './expensecat.controller';

describe('ExpenseCatController', () => {
  let controller: ExpenseCatController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExpenseCatController],
    }).compile();

    controller = module.get<ExpenseCatController>(ExpenseCatController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
