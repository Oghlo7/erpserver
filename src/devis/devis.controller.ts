import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { DevisService } from './devis.service';

@Controller('devis')
export class DevisController {
  constructor(private readonly devisService: DevisService) {}

  @Get('all')
  async getAllDevis() {
    const devis = await this.devisService.getAllDevis();
    return devis;
  }

  @Get(':id')
  async getDevisById(@Param('id') id: string) {
    console.log('Fetching devis with ID:', id);
    return this.devisService.getDevisById(id);
  }

  @Get('admin/:idAdmin')
  async getDevisByAdmin(@Param('idAdmin') idAdmin: string) {
    console.log('Fetching devis created by admin ID:', idAdmin);
    return this.devisService.getDevisByAdmin(idAdmin);
  }

  @Post('')
  async createDevis(@Body() body: {
    client: string;
    dateExpiration: string;
    total: number;
    status: string;
    articles?: Record<string, any>;
    created_by: string;
    paid: number;
    numFacture: string;
    type: string;
  }) {
    const { client, dateExpiration, total, status, articles, created_by, paid, numFacture, type } = body;
    return this.devisService.createDevis({
      client,
      dateExpiration,
      total,
      status,
      articles,
      created_by,
      paid,
      numFacture,
      type
    });
  }

  @Put(':id')
  async updateDevis(
    @Param('id') id: string,
    @Body() body: {
      client?: string;
      dateExpiration?: string;
      total?: number;
      status?: string;
      articles?: Record<string, any>;
      paid?: number;
      numFacture?: string;
      type?: string;
    }
  ) {
    console.log('Updating devis');
    const { client, dateExpiration, total, status, articles, paid, numFacture, type } = body;
    return this.devisService.updateDevis({
      id,
      client,
      dateExpiration,
      total,
      status,
      articles,
      paid,
      numFacture,
      type
    });
  }

  @Delete(':id')
  async deleteDevis(@Param('id') id: string) {
    console.log('Controller: Deleting devis with ID:', id);
    return this.devisService.deleteDevis(id);
  }
}
