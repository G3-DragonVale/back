import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { Role } from '@prisma/client';


@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private prisma: PrismaService,
  ) { }

  async validateUser(nickname: string, mdp: string): Promise<any> {
    const user = await this.prisma.user.findUnique({ where: { nickname: nickname } });
    if (user && await bcrypt.compare(mdp, user.mdp)) {
      const { mdp, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { nom: user.nickname, sub: user.id, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }


  async register(data: { nickname: string; mdp: string;}) {
    const existingUser = await this.prisma.user.findUnique({
      where: { nickname: data.nickname },
    });

    if (existingUser) throw new ConflictException('Nom déjà utilisé');
    
    const hashedPassword = await bcrypt.hash(data.mdp, 10);

    const user = await this.prisma.user.create({
      data: {
        nickname: data.nickname,
        mdp: hashedPassword,
      },
    });
    return this.login(user);
  }
}
