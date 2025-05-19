import { Body, Controller, Get, Post, Put, Delete, Param } from '@nestjs/common';
import { LeadsService } from './leads.service';

@Controller('leads')
export class LeadsController {
  constructor(private readonly leadsService: LeadsService) {}

  @Get('all')
  async getAllLeads() {
    return this.leadsService.getAllLeads();
  }

  @Post('')
  async createLead(
    @Body() body: {
        nom: string; 
        email: string; 
        source: string; 
        pays: string; 
        tele: string; 
        type: string; 
        projet: string; 
        statut: string; 
        created_by: string }) {
    const { nom, email, source, pays, tele, type, projet, statut, created_by } = body;
    return this.leadsService.createLead({ nom, email, source, pays, tele, type, projet, statut, created_by });
  }

  @Get(':id')
  getLeadById(@Param('id') id: string) {
    console.log('Fetching lead with ID:', id);
    return this.leadsService.getLeadById(id);
  }

  @Put(':id')
  updateLead(
    @Param('id') id: string,
    @Body() body: { 
      nom?: string; 
      email?: string; 
      source?: string; 
      pays?: string; 
      tele?: string; 
      type?: string; 
      projet?: string; 
      statut?: string; 
    }
  ) {
    console.log('Updating lead');
    const { nom, email, source, pays, tele, type, projet, statut } = body;
    return this.leadsService.updateLead({
      id,
      nom,
      email,
      source,
      pays,
      tele,
      type,
      projet,
      statut
    });
  }

  @Delete(':id')
  deleteLead(@Param('id') id: string) {
    console.log('Controller: Deleting lead with ID:', id);
    return this.leadsService.deleteLead(id);
  }

  @Get('admin/:idAdmin')
  getLeadsByAdmin(@Param('idAdmin') idAdmin: string) {
    console.log('Fetching leads created by admin ID:', idAdmin);
    return this.leadsService.getLeadsByAdmin(idAdmin);
  }
}
