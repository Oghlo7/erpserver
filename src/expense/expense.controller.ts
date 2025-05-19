import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { ExpenseService } from './expense.service';

@Controller('expense')
export class ExpenseController {
  constructor(private readonly expenseService: ExpenseService) {}

  @Get('all')
  async getAllExpenses() {
    return this.expenseService.getAllExpenses();
  }

  @Get(':id')
  async getExpenseById(@Param('id') id: string) {
    console.log('Fetching expense with ID:', id);
    return this.expenseService.getExpenseById(id);
  }

  @Get('admin/:idAdmin')
  async getExpensesByAdmin(@Param('idAdmin') idAdmin: string) {
    console.log('Fetching expenses created by admin ID:', idAdmin);
    return this.expenseService.getExpensesByAdmin(idAdmin);
  }

  @Post('')
  async createExpense(@Body() body: {
    nom: string;
    category?: string;
    totale: string;
    desc?: string;
    ref?: string;
    devis?: string;
    created_by: string;
  }) {
    const { nom, category, totale, desc, ref, devis, created_by } = body;
    return this.expenseService.createExpense({
      nom,
      category,
      totale,
      desc,
      ref,
      devis,
      created_by
    });
  }

  @Put(':id')
  async updateExpense(
    @Param('id') id: string,
    @Body() body: {
      nom?: string;
      category?: string;
      totale?: number;
      desc?: string;
      ref?: string;
      devis?: string;
    }
  ) {
    console.log('Updating expense');
    const { nom, category, totale, desc, ref, devis } = body;
    return this.expenseService.updateExpense({
      id,
      nom,
      category,
      totale,
      desc,
      ref,
      devis
    });
  }

  @Delete(':id')
  async deleteExpense(@Param('id') id: string) {
    console.log('Controller: Deleting expense with ID:', id);
    return this.expenseService.deleteExpense(id);
  }
}
