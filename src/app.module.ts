// src/app.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminController } from './admin/admin.controller';
import { AdminModule } from './admin/admin.module';
import { AdminService } from './admin/admin.service';
import { PrismaService } from './prisma.service';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/auth.service';
import { PersonModule } from './person/person.module';
import { PersonService } from './person/person.service';
import { PersonController } from './person/person.controller';
import { ProductcatModule } from './productcat/productcat.module';
import { LeadsModule } from './leads/leads.module';
import { InvoiceModule } from './invoice/invoice.module';
import { ClientModule } from './client/client.module';
import { EntrepriseModule } from './entreprise/entreprise.module';
import { EntrepriseController } from './entreprise/entreprise.controller';
import { EntrepriseService } from './entreprise/entreprise.service';
import { ExpenseCatModule } from './expensecat/expensecat.module';
import { DevisModule } from './devis/devis.module';
import { ProductModule } from './product/product.module';
import { ExpenseModule } from './expense/expense.module';
import { PaymentService } from './payment/payment.service';
import { PaymentModule } from './payment/payment.module';

@Module({
  imports: [AdminModule, AuthModule, PersonModule, ProductcatModule, LeadsModule, InvoiceModule, EntrepriseModule, ClientModule, ExpenseCatModule, DevisModule, ProductModule, ExpenseModule, PaymentModule],
  controllers: [AppController, AdminController, AuthController, PersonController, EntrepriseController],
  providers: [AppService, AdminService, AuthService, PrismaService, PersonService, EntrepriseService, PaymentService],
})
export class AppModule {}