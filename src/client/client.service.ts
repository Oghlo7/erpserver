import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ClientService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllClients() {
    const clients = await this.prisma.client.findMany({
      select: {
        id: true,
        first_name: true,
        last_name: true,
        pays: true,
        type: true,
        created_at: true
      }
    })

    return clients.map(client => ({
      ...client,
      created_at: client.created_at.toString()
    }));
  }

  async create({
    first_name,
    last_name,
    email,
    tele,
    pays,
    type,
    created_by
  }: {
    first_name: string;
    last_name: string;
    email: string;
    tele: string;
    pays: string;
    type: string;
    created_by: string;
  }) {
    const client = await this.prisma.client.create({
      data: {
        first_name,
        last_name,
        email,
        tele,
        pays,
        type,
        created_by
      }
    });

    return client;
  }

  async getClientById(id: string) {
    try {
      const client = await this.prisma.client.findUnique({
        where: {
          id
        }
      });

      return client;
    } catch (err) {
      console.error('Error fetching client:', err);
      throw err;
    }
  }

  async updateClient({
    id,
    first_name,
    last_name,
    pays,
    tele,
    email,
    type,
  }: {
    id: string;
    first_name?: string;
    last_name?: string;
    pays?: string;
    tele?: string;
    email?: string;
    type?: string;
  }) {
    try {
      console.log('Updating client:', {
        id,
        first_name,
        last_name,
        pays,
        tele,
        email,
        type,
      });

      // const updateData: any = {};
      
      // if (first_name !== undefined) updateData.first_name = first_name;
      // if (last_name !== undefined) updateData.last_name = last_name;
      // if (pays !== undefined) updateData.pays = pays;
      // if (tele !== undefined) updateData.tele = tele;
      // if (email !== undefined) updateData.email = email;
      // if (type !== undefined) updateData.type = type;

      const client = await this.prisma.client.update({
        where: { id },
        data: {
          ...first_name && {first_name},
          ...last_name && {last_name},
          ...pays && {pays},
          ...tele && {tele},
          ...email && {email},
          ...type && {type}
        },
      });

      return client;
    } catch (error) {
      console.error('Error updating client:', error);
      throw error;
    }
  }

  async deleteClient(id: string) {
    try {
      console.log('Deleting client with ID:', id);
      
      const client = await this.prisma.client.delete({
        where: { id }
      });
      
      return client;
    } catch (error) {
      console.error('Error deleting client:', error);
      throw error;
    }
  }

  async getClientsByAdmin(idAdmin: string) {
    try {
      console.log('Fetching clients created by admin ID:', idAdmin);
      
      const clients = await this.prisma.client.findMany({
        where: {
          created_by: idAdmin
        }
      });
      
      return clients.map(client => ({
        ...client,
        created_at: client.created_at.toString()
      }));
    } catch (error) {
      console.error('Error fetching clients by admin:', error);
      throw error;
    }
  }
}
