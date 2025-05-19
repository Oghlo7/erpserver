import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class LeadsService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllLeads() {
    const leads = await this.prisma.leads.findMany({
      select: {
        id: true,
        nom: true,
        type: true,
        projet: true,
        statut: true,
        created_at: true,
        created_by: true
      }
    })

    return leads.map(lead => ({
      ...lead,
      created_at: lead.created_at.toString()
    }));
  }
  
  async createLead({
    nom,
    email,
    source,
    pays,
    tele,
    type,
    projet,
    statut,
    created_by
  }: {
    nom: string;
    email: string;
    source: string;
    pays: string;
    tele: string;
    type: string;
    projet: string;
    statut: string;
    created_by: string;
  }) {
    const lead = await this.prisma.leads.create({
      data: {
        nom,
        email,
        source,
        pays,
        tele,
        type,
        projet,
        statut,
        created_by
      }
    })

    return lead;
  }
  
  async getLeadById(id: string) {
    try {
      const lead = await this.prisma.leads.findUnique({
        where: {
          id
        }
      });

      return lead;
    } catch (err) {
      console.error('Error fetching lead:', err);
      throw err;
    }
  }

  async updateLead({
    id,
    nom,
    email,
    source,
    pays,
    tele,
    type,
    projet,
    statut,
  }: {
    id: string;
    nom?: string;
    email?: string;
    source?: string;
    pays?: string;
    tele?: string;
    type?: string;
    projet?: string;
    statut?: string;
  }) {
    try {
      console.log('Updating lead:', {
        id,
        nom,
        email,
        source,
        pays,
        tele,
        type,
        projet,
        statut,
      });

      const lead = await this.prisma.leads.update({
        where: { id },
        data: {
          ...(nom && { nom }),
          ...(email && { email }),
          ...(source && { source }),
          ...(pays && { pays }),
          ...(tele && { tele }),
          ...(type && { type }),
          ...(projet && { projet }),
          ...(statut && { statut }),
        },
      });

      return { lead };
    } catch (error) {
      console.error('Error updating lead:', error);
      throw error;
    }
  }

  async deleteLead(id: string) {
    try {
      console.log('Deleting lead with ID:', id);
      
      const lead = await this.prisma.leads.delete({
        where: { id }
      });
      
      return { lead };
    } catch (error) {
      console.error('Error deleting lead:', error);
      throw error;
    }
  }

  async getLeadsByAdmin(idAdmin: string) {
    try {
      console.log('Fetching leads created by admin ID:', idAdmin);
      
      const leads = await this.prisma.leads.findMany({
        where: {
          created_by: idAdmin
        },
        select: {
          id: true,
          nom: true,
          email: true,
          source: true,
          pays: true,
          tele: true,
          type: true,
          projet: true,
          statut: true,
          created_by: true,
          created_at: true,
        }
      });
      
      return leads.map(lead => ({
        ...lead,
        created_at: lead.created_at.toString()
      }));
    } catch (error) {
      console.error('Error fetching leads by admin:', error);
      throw error;
    }
  }
}
