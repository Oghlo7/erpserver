import { Controller, Get, Post, Put, Body, Param, Delete } from '@nestjs/common';
import { ProductcatService } from './productcat.service';
// import { JsonValue } from '@prisma/client/runtime/library';

@Controller('productCategory')
export class ProductcatController {
  constructor(private readonly productCat: ProductcatService ) {}

  @Get('all')
  getAllProductCats() {
    console.log('Fetching all product categories');
    return this.productCat.getProductCats();
  }

  @Get(':id')
  getProductCatById(@Param('id') id: string) {
    console.log('Fetching product category with ID:', id);
    return this.productCat.productCatById(id);
  }

  @Get('admin/:idAdmin')
  getProductCatsByAdmin(@Param('idAdmin') idAdmin: string) {
    console.log('Fetching product categories created by admin ID:', idAdmin);
    return this.productCat.getProductCatsByAdmin(idAdmin);
  }

  @Post('')
  postProductCat(@Body() body: { nom: string; desc: string; couleur: string; created_by: string; active: boolean; }) {
    console.log('Adding a new product category');

    const { nom, desc, couleur, created_by, active } = body;

    return this.productCat.createProductCat({
      nom,
      desc,
      couleur,
      created_by,
      active,
    });
  }

  @Put(':id')
  updateProductCat(@Param('id') id: string, @Body() body: { 
    nom?: string; 
    desc?: string; 
    couleur?: string; 
    active?: boolean; 
  }) {
    console.log('Updating a product category');

    const { nom, desc, couleur, active } = body;

    return this.productCat.updateProductCat({
      id,
      nom,
      desc,
      couleur,
      active,
    });
  }

  @Delete(':id')
  deleteProductCat(@Param('id') id: string) {
    console.log('Deleting a product category');
    return this.productCat.deleteProductCat(id);
  }

  // Example of a request body to create a product category
  // {
  //   "nom": "champoin",
  //   "desc": "lequid products",
  //   "couleur": [
  //       "liquid" ,
  //       "no chime products",
  //       "healthy"
  //   ],
  //   "created_by": "da4652e9-ad82-40df-a034-636c124c7e4e",
  //   "active": true
  // }
}
