import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { ClientService } from './client.service';

@Controller('client')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Get('all')
  async getAllClients() {
    return this.clientService.getAllClients();
  }

  @Post('')
  async create(@Body () body: {
    first_name: string;
    last_name: string;
    email: string;
    tele: string;
    pays: string;
    type: string;
    created_by: string;
  }) {

    const { first_name, last_name, email, tele, pays, type, created_by } = body;
    return this.clientService.create({ first_name, last_name, email, tele, pays, type, created_by });
  }

  @Get(':id')
  getClientById(@Param('id') id: string) {
    console.log('Fetching client with ID:', id);
    return this.clientService.getClientById(id);
  }

  @Put(':id')
  updateClient(
    @Param('id') id: string,
    @Body() body: { 
      first_name?: string;
      last_name?: string;
      pays?: string;
      tele?: string;
      email?: string;
      type?: string;
    }
  ) {
    console.log('Updating client');
    const { first_name, last_name, pays, tele, email, type } = body;
    return this.clientService.updateClient({
      id,
      first_name,
      last_name,
      pays,
      tele,
      email,
      type
    });
  }

  @Delete(':id')
  deleteClient(@Param('id') id: string) {
    console.log('Controller: Deleting client with ID:', id);
    return this.clientService.deleteClient(id);
  }

  @Get('admin/:idAdmin')
  async getClientsByAdmin(@Param('idAdmin') idAdmin: string) {
    console.log('Fetching clients created by admin ID:', idAdmin);
    return this.clientService.getClientsByAdmin(idAdmin);
  }
}
