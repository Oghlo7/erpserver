import { Controller, Body, Get, Post, Put, Delete, Param } from '@nestjs/common';
import { EntrepriseService } from './entreprise.service';

@Controller('entreprise')
export class EntrepriseController {
  constructor(private readonly entrepriseService: EntrepriseService) {}

  @Get('all')
  getAllEntreprises() {
    console.log('Fetching all entreprises');
    return this.entrepriseService.getAllEntreprises();
  }

  @Get(':id')
  getEntrepriseById(@Param('id') id: string ) {
    return this.entrepriseService.entrepriseById(id);
  }

  @Post('create')
  createEntreprise(
    @Body() body: { 
      nom: string; 
      contact: Record<string, any>; 
      tele: string; 
      website: string; 
      email: string; 
      created_by: string 
    }
  ) {
    console.log('Creating new entreprise');
    const { nom, contact, tele, website, email, created_by } = body;
    return this.entrepriseService.createEntreprise({
      nom,
      contact,
      tele,
      website,
      email,
      created_by
    });
  }

  @Put(':id')
  updateEntreprise(
    @Param('id') id: string,
    @Body() body: { 
      nom?: string; 
      contact?: Record<string, any>; 
      tele?: string; 
      website?: string; 
      email?: string; 
    }
  ) {
    console.log('Updating entreprise');
    const { nom, contact, tele, website, email } = body;
    return this.entrepriseService.updateEntreprise({
      id,
      nom,
      contact,
      tele,
      website,
      email
    });
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.entrepriseService.deleteExpCat(id);
  }

  @Get('admin/:idAdmin')
  async getEntreprisesByAdmin(@Param('idAdmin') idAdmin: string) {
    console.log('Fetching entreprises created by admin ID:', idAdmin);
    return this.entrepriseService.getEntreprisesByAdmin(idAdmin);
  }
}