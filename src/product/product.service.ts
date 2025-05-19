import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ProductService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllProducts() {
    const products = await this.prisma.product.findMany({
      select: {
        id: true,
        nom: true,
        desc: true,
        price: true,
        category: true,
        // stock: true,
        created_at: true,
        // created_by: true
      }
    });

    return products.map(product => ({
      ...product,
      created_at: product.created_at.toString()
    }));
  }

  async getProductById(id: string) {
    try {
      const product = await this.prisma.product.findUnique({
        where: {
          id
        }
      });

      return product;
    } catch (err) {
      console.error('Error fetching product:', err);
      throw err;
    }
  }

  async createProduct({
    nom,
    desc,
    price,
    category,
    ref,
    devis,
    // stock,
    created_by
  }: {
    nom: string;
    desc: string;
    price: number;
    category: string;
    ref: string;
    devis: string;
    // stock: number;
    created_by: string;
  }) {
    try {
      console.log('Creating product:', {
        nom,
        desc,
        price,
        category,
        ref,
        devis,
        // stock,
        created_by
      });

      const product = await this.prisma.product.create({
        data: {
          nom,
          desc,
          price,
          category,
          ref,
          devis,
          created_by,
          // stock,
          // created_by
        },
      });

      return { 
        ...product,
        created_at: product.created_at.toString()
      };
    } catch (error) {
      console.error('Error creating product:', error);
      throw error;
    }
  }

  async updateProduct({
    id,
    nom,
    desc,
    price,
    category,
    ref,
    devis
    // stock,
  }: {
    id: string;
    nom?: string;
    desc?: string;
    price?: number;
    category?: string;
    ref?: string;
    devis?: string;
    // stock?: number;
  }) {
    try {
      console.log('Updating product:', {
        id,
        nom,
        desc,
        price,
        category,
        ref,
        devis
        // stock
      });

      const updateData: any = {};
      
      if (nom) updateData.nom = nom;
      if (desc) updateData.desc = desc;
      if (price !== undefined) updateData.price = price;
      if (category) updateData.category = category;
      if (ref !== undefined ) updateData.ref = ref;
      if (devis !== undefined ) updateData.devis = devis;
      // if (stock !== undefined) updateData.stock = stock;

      const product = await this.prisma.product.update({
        where: { id },
        data: updateData,
      });

      return { 
        ...product,
        created_at: product.created_at.toString()
      };
    } catch (error) {
      console.error('Error updating product:', error);
      throw error;
    }
  }

  async deleteProduct(id: string) {
    try {
      console.log('Deleting product with ID:', id);
      
      const product = await this.prisma.product.delete({
        where: { id }
      });
      
      return { 
        ...product,
        created_at: product.created_at.toString()
      };
    } catch (error) {
      console.error('Error deleting product:', error);
      throw error;
    }
  }

  async getProductsByAdmin(idAdmin: string) {
    try {
      console.log('Fetching products created by admin ID:', idAdmin);
      
      const products = await this.prisma.product.findMany({
        where: {
          created_by: idAdmin
        },
        select: {
          id: true,
          nom: true,
          desc: true,
          price: true,
          category: true,
          ref: true,
          devis: true,
          created_at: true
        }
      });
      
      return products.map(product => ({
        ...product,
        created_at: product.created_at.toString()
      }));
    } catch (error) {
      console.error('Error fetching products by admin:', error);
      throw error;
    }
  }
}
