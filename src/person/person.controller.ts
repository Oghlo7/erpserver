import { Controller, Delete, Get, Post, Put, Body, Param } from '@nestjs/common';
import { PersonService } from './person.service';

@Controller('person')
export class PersonController {
  constructor( private readonly person: PersonService ) {}

  @Get('all')
  getAllPersons() {
    console.log('Fetching all persons');

    return this.person.getPersons();
  }

  @Get(':id')
  getPerson(@Param('id') id: string ) {
    console.log('Fetching a');

    return this.person.getPerson(id);
  }

  @Post('addPerson')
  createPerson(@Body() body: { first_name: string; last_name: string; email: string; tele: string; created_by: string }) {
    console.log('Adding a new person');
    const { first_name, last_name, email, tele, created_by } = body;
    // const created_by = BigInt(body.created_by);

    return this.person.createPerson({
      first_name,
      last_name,
      email,
      tele,
      created_by // Convert to BigInt explicitly
    })
  }

  @Put(':id')
  updatePerson(@Body() body: { 
    id: string;
    first_name?: string; 
    last_name?: string; 
    email?: string; 
    tele?: string; 
  }) {
    console.log('Updating a person');
    const { id, first_name, last_name, email, tele } = body;

    return this.person.updatePerson({
      id,
      first_name,
      last_name,
      email,
      tele
    })
  }

  @Delete(':id')
  deletePerson(@Param('id') id: string) {
    console.log('Controller: Deleting person with ID:', id);
    return this.person.deletePerson(id);
  }

  @Get('admin/:idAdmin')
  getPersonsByAdmin(@Param('idAdmin') idAdmin: string) {
    console.log('Fetching persons created by admin ID:', idAdmin);
    return this.person.getPersonsByAdmin(idAdmin);
  }
}
