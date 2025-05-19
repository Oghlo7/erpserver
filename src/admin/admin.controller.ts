import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { AdminService } from './admin.service';

@Controller('admin')
export class AdminController {
  constructor(private readonly amdinService: AdminService) {}
  
  @Get('all')
  getAllAdmins() {
    return this.amdinService.getAdmins();
  }

  @Get('/:adminId')
  getAdmin(@Param('adminId') adminId: string) {
    return this.amdinService.getAdmin({ adminId });
  }

  @Post('addAdmin')
  postAdmin(@Body() body: { email: string; password: string; first_name: string; last_name: string; profil: string }) {
    const { email, password, first_name, last_name, profil } = body;
    return this.amdinService.createAdmin({
      email,
      password,
      first_name,
      last_name,
      profil,
    })
  }

  @Put(':id')
  updateAdmin(@Param('id') id: string, @Body() body: { email?: string; password?: string; first_name?: string; last_name?: string; profil?: string }) {
    const { email, password, first_name, last_name, profil } = body;

    console.log('Updating admin');
    return this.amdinService.updateAdmin({
      id,
      email,
      password,
      first_name,
      last_name,
      profil,
    })
    
  }

  @Delete(':id')
  deleteAdmin(@Param('id') id: string) {
    // console.log('Deleting admin:', id);
    return this.amdinService.deleteAdmin(id);
  }


}
