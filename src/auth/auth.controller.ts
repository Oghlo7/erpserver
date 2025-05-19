import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';

export type AuthBody = { email: string; password: string };

@Controller('auth')
export class AuthController {
  constructor( private readonly authService: AuthService ) {}

  @Post('login')
  async login(@Body() authBody: AuthBody ) {
    return await this.authService.login({
      authBody,
    });
  }

  // @Get()
  // async authenticate() {
    
  //   return;
  // }

  @UseGuards(JwtAuthGuard)
  @Get()
  async authenticateAdmin(@Request() req) {
    console.log( req.user );
    return req.user;
  }
}
