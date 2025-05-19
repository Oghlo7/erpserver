import { Module } from '@nestjs/common';
import { EntrepriseController } from './entreprise.controller';
import { EntrepriseService } from './entreprise.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [EntrepriseController],
  providers: [EntrepriseService, PrismaService],
})
export class EntrepriseModule {}