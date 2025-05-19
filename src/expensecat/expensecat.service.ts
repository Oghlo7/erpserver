import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ExpenseCatService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllExpCat() {
    try {
      console.log('Fetching all expense categories');
      
      const expenseCategories = await this.prisma.expenseCategory.findMany({
        select: {
          id: true,
          nom: true,
          desc: true,
          couleur: true,
          active: true,
          created_at: true,
          created_by: true,
        },
      });
      
      return expenseCategories.map(category => ({
        ...category,
        created_at: category.created_at.toString(),
      }));
    } catch (error) {
      console.error('Error fetching expense categories:', error);
      throw error;
    }
  }

  async getExpCatById(id: string) {
    try {
      console.log('Fetching expense category with ID:', id);
      
      const expenseCategory = await this.prisma.expenseCategory.findUnique({
        where: { id },
        select: {
          id: true,
          nom: true,
          desc: true,
          active: true,
          created_at: true,
          created_by: true,
        },
      });
      
      if (!expenseCategory) {
        throw new Error('Expense category not found');
      }
      
      return {
        ...expenseCategory,
        created_at: expenseCategory.created_at.toString()
      };
    } catch (error) {
      console.error('Error fetching expense category:', error);
      throw error;
    }
  }

  async createExpCat({
    nom,
    desc,
    active,
    couleur,
    created_by,
  }: {
    nom: string;
    desc: string;
    active: boolean,
    couleur: string,
    created_by: string;
  }) {
    try {
      console.log('Creating expense category:', {
        nom,
        desc,
        created_by,
      });

      const expenseCategory = await this.prisma.expenseCategory.create({
        data: {
          nom,
          desc,
          active,
          couleur,
          created_by,
        },
      });

      return { expenseCategory };
    } catch (error) {
      console.error('Error creating expense category:', error);
      throw error;
    }
  }

  async updateExpCat({
    id,
    nom,
    desc,
    active,
    couleur,
    created_by,
  }: {
    id: string;
    nom?: string;
    desc?: string;
    active?: boolean;
    couleur?: string;
    created_by?: string;
  }) {
    try {
      console.log('Updating expense category:', {
        id,
        nom,
        desc,
        active,
        couleur,
        created_by,
      });

      const updateData: any = {};
      
      if (nom !== undefined) updateData.nom = nom;
      if (desc !== undefined) updateData.desc = desc;
      if (active !== undefined) updateData.active = active;
      if (couleur !== undefined) updateData.couleur = couleur;
      if (created_by !== undefined) updateData.created_by = created_by;

      const expenseCategory = await this.prisma.expenseCategory.update({
        where: { id },
        data: updateData
      });

      return { expenseCategory };
    } catch (error) {
      console.error('Error updating expense category:', error);
      throw error;
    }
  }

  async deleteExpCat(id: string) {
    try {
      console.log('Deleting expense category with ID:', id);
      
      const expenseCategory = await this.prisma.expenseCategory.delete({
        where: { id },
      });
      
      return { expenseCategory };
    } catch (error) {
      console.error('Error deleting expense category:', error);
      throw error;
    }
  }

  async getExpCatsByAdmin(idAdmin: string) {
    try {
      console.log('Fetching expense categories created by admin ID:', idAdmin);
      
      const expenseCategories = await this.prisma.expenseCategory.findMany({
        where: {
          created_by: idAdmin
        },
        select: {
          id: true,
          nom: true,
          desc: true,
          active: true,
          couleur: true,
          created_at: true,
          created_by: true
        }
      });
      
      return expenseCategories.map(category => ({
        ...category,
        created_at: category.created_at.toString()
      }));
    } catch (error) {
      console.error('Error fetching expense categories by admin:', error);
      throw error;
    }
  }
}
