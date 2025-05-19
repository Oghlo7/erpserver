import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class DevisService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAllDevis() {
    const devis = await this.prismaService.devis.findMany({
      select: {
        id: true,
        client: true,
        dateExpiration: true,
        total: true,
        status: true,
        articles: true,
        created_by: true,
        created_at: true,
      }
    })

    return devis;
  }

  async getDevisById(id: string) {
    try {
      const devis = await this.prismaService.devis.findUnique({
        where: {
          id
        }, select: {
          id: true,
          client: true,
          dateExpiration: true,
          total: true,
          status: true,
          articles: true,
          created_by: true,
          created_at: true,
          paid: true,
          numFacture: true,
          type: true
        }
      });

      return devis;
    } catch (err) {
      console.error('Error fetching devis:', err);
      throw err;
    }
  }

  async createDevis({
    client,
    dateExpiration,
    total,
    status,
    articles,
    created_by,
    paid,
    numFacture,
    type,
  }: {
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
    try {
      console.log('Creating devis:', {
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

      const devis = await this.prismaService.devis.create({
        data: {
          client,
          dateExpiration: new Date(dateExpiration),
          total,
          status,
          articles,
          created_by,
          paid: paid ?? 0,
          numFacture,
          type
        },
      });

      console.log('Created devis:', devis);

      return { 
        ...devis,
        dateExpiration: dateExpiration?.toString(),
        created_at: devis.created_at.toString()
      };
    } catch (error) {
      console.error('Error creating devis:', error);
      throw error;
    }
  }

  async updateDevis({
    id,
    client,
    dateExpiration,
    total,
    status,
    articles,
    paid,
    numFacture,
    type,
  }: {
    id: string;
    client?: string;
    dateExpiration?: string;
    total?: number;
    status?: string;
    articles?: Record<string, any>;
    paid?: number;
    numFacture?: string;
    type?: string;
  }) {
    try {
      console.log('Updating devis:', {
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

      const updateData: any = {};
      
      if (client) updateData.client = client;
      if (dateExpiration) updateData.dateExpiration = new Date(dateExpiration);
      if (total !== undefined) updateData.total = total;
      if (status) updateData.status = status;
      if (articles) updateData.articles = articles;
      if (paid!== undefined) updateData.paid = paid;
      if (numFacture) updateData.numFacture = numFacture;
      if (type) updateData.type = type;

      const devis = await this.prismaService.devis.update({
        where: { id },
        data: updateData,
      });

      console.log('Updated devis:', devis);

      return { 
        ...devis,
        dateExpiration: devis.dateExpiration.toString(),
        created_at: devis.created_at.toString()
      };
    } catch (error) {
      console.error('Error updating devis:', error);
      throw error;
    }
  }

  async deleteDevis(id: string) {
    try {
      console.log('Deleting devis with ID:', id);
      
      const devis = await this.prismaService.devis.delete({
        where: { id }
      });
      
      return { 
        ...devis,
        dateExpiration: devis.dateExpiration.toString(),
        created_at: devis.created_at.toString()
      };
    } catch (error) {
      console.error('Error deleting devis:', error);
      throw error;
    }
  }

  async getDevisByAdmin(idAdmin: string) {
    try {
      console.log('Fetching devis created by admin ID:', idAdmin);
      
      const devisList = await this.prismaService.devis.findMany({
        where: {
          created_by: idAdmin
        },
        select: {
          id: true,
          client: true,
          dateExpiration: true,
          total: true,
          status: true,
          articles: true,
          created_by: true,
          created_at: true,
          paid: true,
          numFacture: true,
          type: true
        }
      });
      
      return devisList.map(devis => ({
        ...devis,
        dateExpiration: devis.dateExpiration.toString(),
        created_at: devis.created_at.toString()
      }));
    } catch (error) {
      console.error('Error fetching devis by admin:', error);
      throw error;
    }
  }
}
