import { Module } from '@nestjs/common';
import { PersonService } from './person.service';
import { PrismaService } from 'src/prisma.service';
import { PersonController } from './person.controller';

@Module({
  controllers: [PersonController],
  providers: [PersonService, PrismaService]
})
export class PersonModule {}
