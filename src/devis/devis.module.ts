import { Module } from '@nestjs/common';
import { DevisController } from './devis.controller';
import { DevisService } from './devis.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [DevisController],
  providers: [DevisService, PrismaService]
})
export class DevisModule {}
