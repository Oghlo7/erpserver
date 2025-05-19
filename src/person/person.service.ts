import { Injectable } from '@nestjs/common';
import { create } from 'domain';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class PersonService {
  constructor( private readonly prisma: PrismaService ) {}

  async getPersons() {
    console.log('Fetching all persons');

    return await this.prisma.personne.findMany({
      select: {
        id: true,
        first_name: true,
        last_name: true,
        email: true,
        tele: true,
        created_at: true,
        created_by: true,
      }
    });
  }

  async getPerson(id: string) {
    console.log('Fetching a person with ID:', id);

    return await this.prisma.personne.findUnique({
      where: { id },
      select: {
        id: true,
        first_name: true,
        last_name: true,
        email: true,
        tele: true,
        created_at: true,
        created_by: true,
      }
    });
  }


  async createPerson({
    first_name,
    last_name,
    email,
    tele,
    created_by,
  }: {
    first_name: string;
    last_name: string;
    email: string;
    tele: string;
    created_by: string;
  }) {
    try {

      console.log('date: ', JSON.stringify({
        first_name,
        last_name,
        email,
        tele,
        created_by: typeof created_by, // Convert to BigInt explicitly
      }, null, 2));
        
      const person = await this.prisma.personne.create({
          data: {
              first_name,
              last_name,
              email,
              tele,
              created_by, // Convert to BigInt explicitly
          }
      });

        return { person };
    } catch (error) {
        console.error('Error creating person:', error);
        throw error;
    }
  }

  // Add the updatePerson method to the PersonService class
  async updatePerson({
    id,
    first_name,
    last_name,
    email,
    tele,
  }: {
    id: string;
    first_name?: string;
    last_name?: string;
    email?: string;
    tele?: string;
  }) {
    try {
      console.log('Updating person:', {
        id,
        first_name,
        last_name,
        email,
        tele,
      });
  
      const person = await this.prisma.personne.update({
        where: { id },
        data: {
          ...(first_name && { first_name }),
          ...(last_name && { last_name }),
          ...(email && { email }),
          ...(tele && { tele }),
        }
      });
  
      return { person };
    } catch (error) {
      console.error('Error updating person:', error);
      throw error;
    }
  }

  async deletePerson(id: string) {
    try {
      console.log('Deleting person with ID:', id);
      
      const person = await this.prisma.personne.delete({
        where: { id }
      });
      
      return { person };
    } catch (error) {
      console.error('Error deleting person:', error);
      throw error;
    }
  }
  
  async getPersonsByAdmin(idAdmin: string) {
    console.log('Fetching persons created by admin ID:', idAdmin);

    return await this.prisma.personne.findMany({
      where: {
        created_by: idAdmin
      },
      select: {
        id: true,
        first_name: true,
        last_name: true,
        email: true,
        tele: true,
        created_at: true,
        created_by: true,
      }
    });
  }
}
