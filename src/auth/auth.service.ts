import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { AuthBody } from './auth.controller';
import { compare, hash } from 'bcrypt';
import { first } from 'rxjs';
import { JwtService } from '@nestjs/jwt';
import { AdminPayload } from './jwt.strategy';

@Injectable()
export class AuthService {
  constructor( private readonly prisma: PrismaService, private readonly jwtService: JwtService ) {}

  async login({ authBody }: { authBody: AuthBody }) {
    const { email, password } = authBody;
    const hashedPassword = await this.hashPassword({ password });
    console.log({ hashedPassword, password });

    const existingAdmin = await this.prisma.admin.findUnique({
      where: {
        email: email,
      },
    });

    if(!existingAdmin) {
      throw new Error("l'admin n'existe pas. ");
    }

    // const isPasswordSame = password === existingAdmin.password;  // on va changer cette comparaison avec la nouvelle methode créée
    const isPasswordValid = await this.isPasswordValid({
      password,
      hashedPassword: existingAdmin.password,
    })

    if(!isPasswordValid) {
      throw new Error("Mot de passe est invalide. ");
    }

    // if#signAsync# return await this.authenticateAdmin({
    return this.authenticateAdmin({
      adminId: existingAdmin.id.toString(),
    })
  }

  private async hashPassword({ password }: { password: string }) {
    const hashPassword = await hash(password, 10);
    return hashPassword;
  }

  private async isPasswordValid({
    password,
    hashedPassword,
  }: {
    password: string;
    hashedPassword: string;
  }) {
    const isPasswordValid = await compare(password, hashedPassword);
    return isPasswordValid;
  }

  private async authenticateAdmin({ adminId }: AdminPayload) {
    const payload:AdminPayload = { adminId };
    return {
      //  #signAsync# methode pour signAsync
      // access_token: await this.jwtService.signAsync(payload),
      access_token: this.jwtService.sign(payload),
    };
  }
  
}
