import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ExpenseService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllExpenses() {
    try {
      const expenses = await this.prisma.expense.findMany({
        select: {
          id: true,
          created_at: true,
          nom: true,
          category: true,
          totale: true,
          desc: true,
          ref: true,
          devis: true,
          created_by: true
        }
      });

      return expenses.map(expense => ({
        ...expense,
        created_at: expense.created_at.toString()
      }));
    } catch (error) {
      console.error('Error fetching expenses:', error);
      throw error;
    }
  }

  async getExpenseById(id: string) {
    try {
      const expense = await this.prisma.expense.findUnique({
        where: {
          id
        }
      });

      return expense ? {
        ...expense,
        created_at: expense.created_at.toString()
      } : null;
    } catch (err) {
      console.error('Error fetching expense:', err);
      throw err;
    }
  }
  
  async getExpenseByIdAdmin(id: string) {
    try {
      const expenses = await this.prisma.expense.findMany({
        where: {
          created_by: id
        },
        select: {
          id: true,
          created_at: true,
          nom: true,
          category: true,
          totale: true,
          desc: true,
          ref: true,
          devis: true,
          created_by: true
        }
      });

      return expenses.map(expense => ({
        ...expense,
        created_at: expense.created_at.toString()
      }));
    } catch (err) {
      console.error('Error fetching expense:', err);
      throw err;
    }
  }

  async getExpensesByAdmin(idAdmin: string) {
    try {
      console.log('Fetching expenses created by admin ID:', idAdmin);
      
      const expenses = await this.prisma.expense.findMany({
        where: {
          created_by: idAdmin
        },
        select: {
          id: true,
          created_at: true,
          nom: true,
          category: true,
          totale: true,
          desc: true,
          ref: true,
          devis: true
        }
      });
      
      return expenses.map(expense => ({
        ...expense,
        created_at: expense.created_at.toString()
      }));
    } catch (error) {
      console.error('Error fetching expenses by admin:', error);
      throw error;
    }
  }

  async createExpense({
    nom,
    category,
    totale,
    desc,
    ref,
    devis,
    created_by
  }: {
    nom: string;
    category?: string;
    totale: string;
    desc?: string;
    ref?: string;
    devis?: string;
    created_by: string;
  }) {
    try {
      console.log('Creating expense:', {
        nom,
        category,
        totale,
        desc,
        ref,
        devis
      });

      const totale3 = parseFloat(totale);
      console.log(typeof totale3) // Convertir la chaîne totale en un nombre flottant

      const expense = await this.prisma.expense.create({
        data: {
          nom,
          category,
          totale: totale3,
          desc,
          ref,
          devis,
          created_by
        },
      });

      return { 
        ...expense,
        created_at: expense.created_at.toString()
      };
    } catch (error) {
      console.error('Error creating expense:', error);
      throw error;
    }
  }

  async updateExpense({
    id,
    nom,
    category,
    totale,
    desc,
    ref,
    devis
  }: {
    id: string;
    nom?: string;
    category?: string;
    totale?: number;
    desc?: string;
    ref?: string;
    devis?: string;
  }) {
    try {
      console.log('Updating expense:', {
        id,
        nom,
        category,
        totale,
        desc,
        ref,
        devis
      });

      const updateData: any = {};
      
      if (nom !== undefined) updateData.nom = nom;
      if (category !== undefined) updateData.category = category;
      if (totale !== undefined) updateData.totale = totale;
      if (desc !== undefined) updateData.desc = desc;
      if (ref !== undefined) updateData.ref = ref;
      if (devis !== undefined) updateData.devis = devis;

      const expense = await this.prisma.expense.update({
        where: { id },
        data: updateData,
      });

      return { 
        ...expense,
        created_at: expense.created_at.toString()
      };
    } catch (error) {
      console.error('Error updating expense:', error);
      throw error;
    }
  }

  async deleteExpense(id: string) {
    try {
      console.log('Deleting expense with ID:', id);
      
      const expense = await this.prisma.expense.delete({
        where: { id }
      });
      
      return { 
        ...expense,
        created_at: expense.created_at.toString()
      };
    } catch (error) {
      console.error('Error deleting expense:', error);
      throw error;
    }
  }
}
