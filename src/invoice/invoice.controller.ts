import { Controller, Body, Get, Post, Put, Delete, Param } from '@nestjs/common';
import { InvoiceService } from './invoice.service';

@Controller('invoice')
export class InvoiceController {
  constructor( private readonly invoiceService: InvoiceService ) {}

  @Get('all')
  async getAllInvoices() {
    return this.invoiceService.getAllInvoices();
  }

  @Post('')
  async createInvoice(@Body () body: {
    numFacture: string;
    client: string;
    dateExpiration: string;
    total: number;
    paid: number;
    status: string;
    type: string;
    created_by: string;
    articles?: Record<string, any>;
  }) {
    const { numFacture, client, dateExpiration, total, paid, status, type, created_by, articles } = body;
    return this.invoiceService.create({ numFacture, client, dateExpiration, total, paid, status, type, created_by, articles  });
  }

  @Get(':id')
  async getInvoiceById(@Param('id') id: string) {
    console.log('Fetching invoice with ID:', id);
    return this.invoiceService.getInvoiceById(id);
  }

  @Put(':id')
  async updateInvoice(
    @Param('id') id: string,
    @Body() body: { 
      numFacture?: string;
      client?: string;
      dateExpiration?: string;
      total?: number;
      paid?: number;
      status?: string;
      type?: string;
      articles?: Record<string, any>[];
    }
  ) {
    console.log('Updating invoice');
    const { numFacture, client, dateExpiration, total, paid, status, type, articles } = body;
    return this.invoiceService.updateInvoice({
      id,
      numFacture,
      client,
      dateExpiration,
      total,
      paid,
      status,
      type,
      articles
    });
  }

  @Delete(':id')
  async deleteInvoice(@Param('id') id: string) {
    console.log('Controller: Deleting invoice with ID:', id);
    return this.invoiceService.deleteInvoice(id);
  }

  @Get('admin/:idAdmin')
  async getInvoicesByAdmin(@Param('idAdmin') idAdmin: string) {
    console.log('Fetching invoices created by admin ID:', idAdmin);
    return this.invoiceService.getInvoicesByAdmin(idAdmin);
  }
}
