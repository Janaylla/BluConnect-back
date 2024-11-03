import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import * as bcrypt from 'bcryptjs';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class AuthService {

  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
  ) {}

  async findUserByEmail(email: string): Promise<User | null> {
    try {
      const user = await this.prisma.user.findUnique({
        where: { email },
      });
      return user;
    } catch (error) {
      throw new UnauthorizedException('Erro ao buscar usuário');
    }
  }
  async validateUser(username: string, pass: string): Promise<any> {
    // Implemente a busca do usuário pelo nome de usuário
    const user = await this.findUserByEmail(username); // Método fictício
    if (user && bcrypt.compareSync(pass, user.password)) {
      return user;
    }
    throw new UnauthorizedException('Credenciais inválidas');
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async createUser(username: string, password: string) {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    // Salve o novo usuário com senha hashada
    const newUser = { username, password: hashedPassword };
    return newUser;
  }
}
