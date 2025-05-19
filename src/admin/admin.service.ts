import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { hash } from 'bcrypt';
import { log } from 'node:console';

@Injectable()
export class AdminService {
  constructor(private readonly prisma: PrismaService) {}
  async getAdmins() {
    const admins = await this.prisma.admin.findMany({
      select: {
        id: true,
        email: true,
        password: true,
      }
    });

    return admins.map(admin => ({
      ...admin,
      id: admin.id.toString()
    }));
  }

  async getAdmin({ adminId }: { adminId: string }) {
    const admin = await this.prisma.admin.findUnique({
      where: {
        id: adminId,
      },
      select: {
        id: true,
        email: true,
        password: true,
        first_name: true,
        last_name: true,
      }
    })

    return { ...admin, id: admin?.id.toString() };
  }

  async createAdmin({
    email,
    password,
    first_name,
    last_name,
    profil
  }: {
    email: string;
    password: string;
    first_name: string;
    last_name: string;
    profil: string;
  }) {
    const hashedPassword = await this.hashPassword({ password });
    const admin = await this.prisma.admin.create({
      data: {
        first_name,
        last_name,
        profil,
        email,
        password: hashedPassword
      },
      select: {
        id: true,
        email: true,
        password: true,
      }
    });

    return { ...admin, id: admin.id.toString() };
  }

  async updateAdmin({
    id,
    email,
    password,
    first_name,
    last_name,
    profil,
  }: {
    id: string;
    email?: string;
    password?: string;
    first_name?: string;
    last_name?: string;
    profil?: string; 
  }) {
    try {
      console.log('Updating admin:', {
        id,
        email,
        password,
        first_name,
        last_name,
        profil,
      });

      if(password !== undefined) {
        console.log('psword: ', password);
        password = await this.hashPassword({password});
        console.log('psword: ', password);
      }
        

      const admin = await this.prisma.admin.update({
        where: { id },
        data: {
          ...(email && { email }),
          ...(password && { password }),
          ...(first_name && { first_name }),
          ...(last_name && { last_name }),
          ...(profil && { profil }),
        },
      })

      return admin;

    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async deleteAdmin(id: string) {
    const admin = await this.prisma.admin.delete({
      where: { id },
    });

    console.log('admin: ', admin);

    return admin;
  }

  private async hashPassword({ password }: { password: string }) {
    const hashPassword = await hash(password, 10);
    return hashPassword;
  }

  
}
