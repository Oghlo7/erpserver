import { Module } from '@nestjs/common';
import { ProductcatController } from './productcat.controller';
import { ProductcatService } from './productcat.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [ProductcatController],
  providers: [ProductcatService, PrismaService],
})
export class ProductcatModule {}
