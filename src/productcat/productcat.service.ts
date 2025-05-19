import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ProductcatService {
  constructor(private readonly prisma: PrismaService) {}
  
    async getProductCats() {
      console.log('Fetching all product categories');
  
      return await this.prisma.productCategory.findMany({
        select: {
          numCat: true,
          nom: true,
          desc: true,
          created_at: true,
          couleur: true,
          active: true,
          created_by: true,
        }
      });
    }
  
    async getProductCatsByAdmin(idAdmin: string) {
      try {
        console.log('Fetching product categories created by admin ID:', idAdmin);
        
        const productCats = await this.prisma.productCategory.findMany({
          where: {
            created_by: idAdmin
          },
          select: {
            numCat: true,
            nom: true,
            desc: true,
            couleur: true,
            active: true,
            created_at: true,
            created_by: true
          }
        });
        
        return productCats;
      } catch (error) {
        console.error('Error fetching product categories by admin:', error);
        throw error;
      }
    }
  
    async productCatById(id: string) {
      try {
        const productCat = await this.prisma.productCategory.findUnique({
          where: {
            numCat: id
          }
        });

        return productCat;
      } catch (err) {
        console.error('Error fetching product category:', err);
        throw err;
      }
    }

    async createProductCat({
      nom,
      desc,
      couleur,
      created_by,
      active,
    }: {
      nom: string;
      desc: string;
      couleur: string;
      created_by: string;
      active: boolean;
    }) {
      try {
        console.log('Creating product category:', {
          nom,
          desc,
          couleur,
          created_by,
          active,
        });
  
        const productCat = await this.prisma.productCategory.create({
          data: {
            nom,
            desc,
            couleur,
            created_by,
            active,
          }
        });
  
        return { productCat };
      } catch (error) {
        console.error('Error creating product category:', error);
        throw error;
      }
    }

    async updateProductCat({
      id,
      nom,
      desc,
      couleur,
      active,
    }: {
      id: string;
      nom?: string;
      desc?: string;
      couleur?: string;
      active?: boolean;
    }) {
      try {
        console.log('Updating product category:', {
          id,
          nom,
          desc,
          couleur,
          active,
        });

        const productCat = await this.prisma.productCategory.update({
          where: { numCat: id },
          data: {
            ...(nom && { nom }),
            ...(desc && { desc }),
            ...(couleur && { couleur }),
            ...(active !== undefined && { active }),
          }
        });

        return { productCat };
      } catch (error) {
        console.error('Error updating product category:', error);
        throw error;
      }
    }

    async deleteProductCat(id: string) {
      try {
        const productCat = await this.prisma.productCategory.delete({
          where: { numCat: id }
        });
        return { productCat };
      } catch (error) {
        console.error('Error deleting product category:', error);
        throw error;
      }
    }
}
