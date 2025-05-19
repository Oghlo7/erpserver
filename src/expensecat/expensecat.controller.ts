import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { ExpenseCatService } from './expensecat.service';

@Controller('expenseCategory')
export class ExpenseCatController {
  constructor(private readonly expenseCatService: ExpenseCatService) {}

  @Get('all')
  getAllExpCat() {
    console.log('Controller: Fetching all expense categories');
    return this.expenseCatService.getAllExpCat();
  }

  @Get(':id')
  getExpCatById(@Param('id') id: string) {
    console.log('Controller: Fetching expense category with ID:', id);
    return this.expenseCatService.getExpCatById(id);
  }

  @Post('')
  createExpCat(@Body() body: { 
    nom: string; 
    desc: string; 
    active: boolean;
    couleur: string;
    created_by: string;
  }) {
    console.log('Controller: Creating a new expense category');
    const { nom, desc, active, couleur, created_by } = body;
    
    return this.expenseCatService.createExpCat({
      nom,
      desc,
      active,
      couleur,
      created_by,
    });
  }

  @Put(':id')
  async updateExpCat(@Param('id') id: string, @Body() body: { 
    nom?: string; 
    desc?: string; 
    active?: boolean;
    couleur?: string;
    created_by?: string;
  }) {
    console.log('Controller: Updating expense category');
    const { nom, desc, active, couleur, created_by } = body;
    
    return this.expenseCatService.updateExpCat({
      id,
      nom,
      desc,
      active,
      couleur,
      created_by,
    });
  }

  @Delete(':id')
  deleteExpCat(@Param('id') id: string) {
    console.log('Controller: Deleting expense category with ID:', id);
    return this.expenseCatService.deleteExpCat(id);
  }

  @Get('admin/:idAdmin')
  getExpCatsByAdmin(@Param('idAdmin') idAdmin: string) {
    console.log('Controller: Fetching expense categories created by admin ID:', idAdmin);
    return this.expenseCatService.getExpCatsByAdmin(idAdmin);
  }
}
