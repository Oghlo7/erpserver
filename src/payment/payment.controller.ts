import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { PaymentService } from './payment.service';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Get('all')
  async getAllPayments() {
    return this.paymentService.getAllPayments();
  }

  @Get(':id')
  async getPaymentById(@Param('id') id: string) {
    console.log('Fetching payment with ID:', id);
    return this.paymentService.getPaymentById(id);
  }

  @Post('')
  async createPayment(@Body() body: {
    numero?: string;
    date: string;
    montant: number;
    mode: string;
    ref?: string;
    desc?: string;
    created_by: string;
    invoice: string;
  }) {
    const { numero, date, montant, mode, ref, desc, created_by, invoice } = body;
    return this.paymentService.createPayment({
      numero,
      date,
      montant,
      mode,
      ref,
      desc,
      created_by,
      invoice
    });
  }

  @Put(':id')
  async updatePayment(
    @Param('id') id: string,
    @Body() body: {
      numero?: string;
      date?: string;
      montant?: number;
      mode?: string;
      ref?: string;
      desc?: string;
      invoice?: string;
    }
  ) {
    console.log('Updating payment');
    const { numero, date, montant, mode, ref, desc, invoice } = body;
    return this.paymentService.updatePayment({
      id,
      numero,
      date,
      montant,
      mode,
      ref,
      desc,
      invoice
    });
  }

  @Delete(':id')
  async deletePayment(@Param('id') id: string) {
    console.log('Controller: Deleting payment with ID:', id);
    return this.paymentService.deletePayment(id);
  }

  @Get('admin/:idAdmin')
  async getPaymentsByAdmin(@Param('idAdmin') idAdmin: string) {
    console.log('Fetching payments created by admin ID:', idAdmin);
    return this.paymentService.getPaymentsByAdmin(idAdmin);
  }
}
