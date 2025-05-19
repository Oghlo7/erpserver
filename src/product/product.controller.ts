import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { ProductService } from './product.service';


@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get('all')
  async getAllProducts() {
    return this.productService.getAllProducts();
  }

  @Get(':id')
  async getProductById(@Param('id') id: string) {
    console.log('Fetching product with ID:', id);
    return this.productService.getProductById(id);
  }

  @Get('admin/:idAdmin')
  async getProductsByAdmin(@Param('idAdmin') idAdmin: string) {
    console.log('Fetching products created by admin ID:', idAdmin);
    return this.productService.getProductsByAdmin(idAdmin);
  }

  @Post('')
  async createProduct(@Body() body: {
    nom: string;
    desc: string;
    price: number;
    category: string;
    ref: string;
    devis: string;
    // stock: number;
    created_by: string;
  }) {
    const { nom, desc, price, category, ref, devis, created_by } = body;
    return this.productService.createProduct({
      nom,
      desc,
      price,
      category,
      ref,
      devis,
      // stock,
      created_by
    });
  }

  @Put(':id')
  async updateProduct(
    @Param('id') id: string,
    @Body() body: {
      nom?: string;
      desc?: string;
      price?: number;
      category?: string;
      ref?: string;
      devis?: string;
      // stock?: number;
    }
  ) {
    console.log('Updating product');
    const { nom, desc, price, category, ref, devis } = body;
    return this.productService.updateProduct({
      id,
      nom,
      desc,
      price,
      category,
      ref,
      devis
      // stock
    });
  }

  @Delete(':id')
  async deleteProduct(@Param('id') id: string) {
    console.log('Controller: Deleting product with ID:', id);
    return this.productService.deleteProduct(id);
  }
}
