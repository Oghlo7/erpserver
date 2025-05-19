import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';


@Injectable()
export class EntrepriseService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllEntreprises() {
    try {
      const entreprises = await this.prisma.entreprise.findMany({
        select: {
          id: true,
          created_at: true,
          nom: true,
          contact: true,
          tele: true,
          website: true,
          email: true,
          created_by: true,
        },
      });
      return entreprises.map(entreprise => ({
        ...entreprise,
        created_at: entreprise.created_at.toString()
      }));
    } catch (error) {
      console.error('Error fetching entreprises:', error);
      throw error;
    }
  }
  
  async entrepriseById(id: string) {
    try {
      const entreprise = await this.prisma.entreprise.findUnique({
        where: {
          id
        }
      })

      return entreprise;

    } catch (err) {
      console.error('error fetching entreprise:', err);
      throw err;
    }
  }

  async getEntreprisesByAdmin(idAdmin: string) {
    try {
      console.log('Fetching entreprises created by admin ID:', idAdmin);
      
      const entreprises = await this.prisma.entreprise.findMany({
        where: {
          created_by: idAdmin
        },
        select: {
          id: true,
          created_at: true,
          nom: true,
          contact: true,
          tele: true,
          website: true,
          email: true,
          created_by: true,
        }
      });
      
      return entreprises.map(entreprise => ({
        ...entreprise,
        created_at: entreprise.created_at.toString()
      }));
    } catch (error) {
      console.error('Error fetching entreprises by admin:', error);
      throw error;
    }
  }

  async createEntreprise({
    nom,
    contact,
    tele,
    website,
    email,
    created_by,
  }: {
    nom: string;
    contact: Record<string, any>;
    tele: string;
    website: string;
    email: string;
    created_by: string;
  }) {
    try {
      console.log('Creating entreprise:', {
        nom,
        contact,
        tele,
        website,
        email,
        created_by,
      });

      const entreprise = await this.prisma.entreprise.create({
        data: {
          nom,
          contact,
          tele,
          website,
          email,
          created_by,
        },
      });

      return entreprise;
    } catch (error) {
      console.error('Error creating entreprise:', error);
      throw error;
    }
  }

  async updateEntreprise({
    id,
    nom,
    contact,
    tele,
    website,
    email,
  }: {
    id: string;
    nom?: string;
    contact?: Record<string, any>;
    tele?: string;
    website?: string;
    email?: string;
  }) {
    try {
      console.log('Updating entreprise:', {
        id,
        nom,
        contact,
        tele,
        website,
        email,
      });

      const entreprise = await this.prisma.entreprise.update({
        where: { id },
        data: {
          ...(nom && { nom }),
          ...(contact && { contact }),
          ...(tele && { tele }),
          ...(website && { website }),
          ...(email && { email }),
        },
      });

      return { entreprise };
    } catch (error) {
      console.error('Error updating entreprise:', error);
      throw error;
    }
  }

  async deleteExpCat(id: string) {
    const entreprise = await this.prisma.entreprise.delete({
      where: { id }
    });

    return entreprise;
  }
}