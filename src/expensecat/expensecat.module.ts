import { Module } from '@nestjs/common';
import { ExpenseCatController } from './expensecat.controller';
import { ExpenseCatService } from './expensecat.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [ExpenseCatController],
  providers: [ExpenseCatService, PrismaService]
})
export class ExpenseCatModule {}
