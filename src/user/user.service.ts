import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';
import { CreateUserDto, UpdateUser, UserSearchDTO } from './user.dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(createUserDto: CreateUserDto) {
    await this.prisma.user.create({
      data: {
        email: createUserDto.email,
        name: createUserDto.name, // Incluindo o nome
        password: createUserDto.hashedPassword,
        active: createUserDto.active ?? true, // Definindo 'active' como true por padrão
      },
    });
  }
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
  async findById(id: number): Promise<User | undefined> {
    return await this.prisma.user.findUnique({ where: { id, active: true } });
  }
  async inactiveUser(requesterId: number, id: number) {
    if (requesterId === id) {
      throw new Error('Você não pode inativar a si mesmo.');
    }
    await this.prisma.user.update({
      where: { id },
      data: {
        active: false,
      },
    });
  }
  async updateUser(requesterId: number, id: number, data: UpdateUser) {
    if (requesterId === id) {
      throw new Error('Você não pode editar a si mesmo.');
    }
    await this.prisma.user.update({
      where: { id },
      data,
    });
  }
  async listUsers(
    requesterId: number,
    { asc, email, limit, name, order, page }: UserSearchDTO,
  ) {
    return await this.prisma.user.findMany({
      where: {
        id: { not: requesterId },
        ...(name
          ? {
              name: {
                contains: name,
                mode: 'insensitive',
              },
            }
          : null),
        ...(email
          ? {
              email: {
                contains: email,
                mode: 'insensitive',
              },
            }
          : null),
      },
      orderBy: {
        [order]: asc,
      },
      take: limit,
      skip: (page - 1) * limit,
    });
  }
}
