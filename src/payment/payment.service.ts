import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class PaymentService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllPayments() {
    try {
      const payments = await this.prisma.payment.findMany({
        select: {
          id: true,
          numero: true,
          created_at: true,
          date: true,
          montant: true,
          mode: true,
          ref: true,
          desc: true,
          created_by: true,
          invoice: true
        }
      });

      return payments.map(payment => ({
        ...payment,
        created_at: payment.created_at.toString(),
        date: payment.date.toString()
      }));
    } catch (error) {
      console.error('Error fetching payments:', error);
      throw error;
    }
  }

  async getPaymentById(id: string) {
    try {
      const payment = await this.prisma.payment.findUnique({
        where: {
          id
        }
      });

      return payment ? {
        ...payment,
        created_at: payment.created_at.toString(),
        date: payment.date.toString()
      } : null;
    } catch (err) {
      console.error('Error fetching payment:', err);
      throw err;
    }
  }

  async createPayment({
    numero,
    date,
    montant,
    mode,
    ref,
    desc,
    created_by,
    invoice
  }: {
    numero?: string;
    date: string;
    montant: number;
    mode: string;
    ref?: string;
    desc?: string;
    created_by: string;
    invoice: string;
  }) {
    try {
      console.log('Creating payment:', {
        numero,
        date,
        montant,
        mode,
        ref,
        desc,
        created_by,
        invoice
      });

      const date1 = new Date(date);

      const payment = await this.prisma.payment.create({
        data: {
          numero,
          date: new Date(date1),
          montant,
          mode,
          ref,
          desc,
          created_by,
          invoice
        },
      });

      return { 
        ...payment,
        created_at: payment.created_at.toString(),
        date: payment.date.toString()
      };
    } catch (error) {
      console.error('Error creating payment:', error);
      throw error;
    }
  }

  async updatePayment({
    id,
    numero,
    date,
    montant,
    mode,
    ref,
    desc,
    invoice
  }: {
    id: string;
    numero?: string;
    date?: string;
    montant?: number;
    mode?: string;
    ref?: string;
    desc?: string;
    invoice?: string;
  }) {
    try {
      console.log('Updating payment:', {
        id,
        numero,
        date,
        montant,
        mode,
        ref,
        desc,
        invoice
      });

      const updateData: any = {};
      
      if (numero !== undefined) updateData.numero = numero;
      if (date !== undefined) updateData.date = new Date(date);
      if (montant !== undefined) updateData.montant = montant;
      if (mode !== undefined) updateData.mode = mode;
      if (ref !== undefined) updateData.ref = ref;
      if (desc !== undefined) updateData.desc = desc;
      if (invoice !== undefined) updateData.invoice = invoice;

      const payment = await this.prisma.payment.update({
        where: { id },
        data: updateData,
      });

      return { 
        ...payment,
        created_at: payment.created_at.toString(),
        date: payment.date.toString()
      };
    } catch (error) {
      console.error('Error updating payment:', error);
      throw error;
    }
  }

  async deletePayment(id: string) {
    try {
      console.log('Deleting payment with ID:', id);
      
      const payment = await this.prisma.payment.delete({
        where: { id }
      });
      
      return { 
        ...payment,
        created_at: payment.created_at.toString(),
        date: payment.date.toString()
      };
    } catch (error) {
      console.error('Error deleting payment:', error);
      throw error;
    }
  }

  async getPaymentsByAdmin(idAdmin: string) {
    try {
      console.log('Fetching payments created by admin ID:', idAdmin);
      
      const payments = await this.prisma.payment.findMany({
        where: {
          created_by: idAdmin
        },
        select: {
          id: true,
          numero: true,
          date: true,
          montant: true,
          mode: true,
          ref: true,
          desc: true,
          invoice: true,
          created_at: true,
          created_by: true
        }
      });
      
      return payments.map(payment => ({
        ...payment,
        date: payment.date.toString(),
        created_at: payment.created_at.toString()
      }));
    } catch (error) {
      console.error('Error fetching payments by admin:', error);
      throw error;
    }
  }
}
