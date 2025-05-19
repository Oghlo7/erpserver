import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class InvoiceService {
  constructor( private readonly prisma: PrismaService ) {}

  async getAllInvoices() {
    const invoices = await this.prisma.invoice.findMany({
      select: {
        id: true,
        created_at: true,
        numFacture: true,
        client: true,
        dateExpiration: true,
        total: true,
        paid: true,
        status: true,
        type: true,
        created_by: true
      }
    })

    return invoices.map(invoice => ({
      ...invoice,
      created_at: invoice.created_at.toString(),
      dateExpiration: invoice.dateExpiration.toString()
    }));
  }

  async create({
    numFacture,
    client,
    dateExpiration,
    total,
    paid,
    status,
    articles,
    type,
    created_by
  }: {
    numFacture: string;
    client: string;
    dateExpiration: string;
    total: number;
    paid: number;
    status: string;
    articles?: Record<string, any>;
    type: string;
    created_by: string;
  }) {
    const dateEx = new Date(dateExpiration);

    console.log("dateEx", dateEx);

    const invoice = await this.prisma.invoice.create({
      data: {
        numFacture,
        client,
        dateExpiration: dateEx,
        total,
        paid,
        status,
        type,
        created_by,
        articles
      }
    })

    return invoice;
  }

  async getInvoiceById(id: string) {
    try {
      const invoice = await this.prisma.invoice.findUnique({
        where: {
          id
        }
      });

      return invoice ? {
        ...invoice,
        created_at: invoice.created_at.toString(),
        dateExpiration: invoice.dateExpiration.toString()
      } : null;
    } catch (err) {
      console.error('Error fetching invoice:', err);
      throw err;
    }
  }

  async updateInvoice({
    id,
    numFacture,
    client,
    dateExpiration,
    total,
    paid,
    status,
    type,
    articles
  }: {
    id: string;
    numFacture?: string;
    client?: string;
    dateExpiration?: string;
    total?: number;
    paid?: number;
    status?: string;
    type?: string;
    articles?: Record<string, any>[];
  }) {
    try {
      console.log('Updating invoice:', {
        id,
        numFacture,
        client,
        dateExpiration,
        total,
        paid,
        status,
        type,
      });

      const updateData: any = {};
      
      if (numFacture) updateData.numFacture = numFacture;
      if (client) updateData.client = client;
      if (dateExpiration) updateData.dateExpiration = new Date(dateExpiration);
      if (total !== undefined) updateData.total = total;
      if (paid !== undefined) updateData.paid = paid;
      if (status) updateData.status = status;
      if (type) updateData.type = type;
      if (articles) updateData.articles = articles;

      const invoice = await this.prisma.invoice.update({
        where: { id },
        data: updateData,
      });

      return { 
        ...invoice,
        created_at: invoice.created_at.toString(),
        dateExpiration: invoice.dateExpiration.toString()
      };
    } catch (error) {
      console.error('Error updating invoice:', error);
      throw error;
    }
  }

  async deleteInvoice(id: string) {
    try {
      console.log('Deleting invoice with ID:', id);
      
      // First, delete or update any related payment records
      await this.prisma.payment.deleteMany({
        where: {
          invoice: id
        }
      });
      
      // Then delete the invoice
      const invoice = await this.prisma.invoice.delete({
        where: {
          id: id,
        },
      });
      
      return invoice;
    } catch (error) {
      console.error('Error deleting invoice:', error);
      throw error;
    }
  }

  async getInvoicesByAdmin(idAdmin: string) {
    try {
      console.log('Fetching invoices created by admin ID:', idAdmin);
      
      const invoices = await this.prisma.invoice.findMany({
        where: {
          created_by: idAdmin
        },
        select: {
          id: true,
          numFacture: true,
          client: true,
          dateExpiration: true,
          total: true,
          paid: true,
          status: true,
          type: true,
          created_at: true,
          created_by: true
        }
      });
      
      return invoices.map(invoice => ({
        ...invoice,
        dateExpiration: invoice.dateExpiration.toString(),
        created_at: invoice.created_at.toString()
      }));
    } catch (error) {
      console.error('Error fetching invoices by admin:', error);
      throw error;
    }
  }
}
