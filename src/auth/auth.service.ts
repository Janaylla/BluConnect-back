import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import * as bcrypt from 'bcryptjs';
import { LoginDto } from './auth.dto';
import { UserService } from '../user/user.service';
import { CreateUserDto, UserDto } from '../user/user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async onModuleInit() {
    await this.createInitialUser();
  }
  async createUser(createUserDto: UserDto) {
    const createUserDtoHashed = {
      ...createUserDto,
      hashedPassword: await this.hashPassword(createUserDto.password),
    };
    await this.userService.createUser(createUserDtoHashed);
  }
  async createInitialUser() {
    const password = process.env.ADMIN_PASSWORD;
    const admin: CreateUserDto = {
      email: process.env.ADMIN_EMAIL,
      name: process.env.ADMIN_NAME,
      hashedPassword: await this.hashPassword(password),
      active: true,
    };
    const userExists = await this.userService.findUserByEmail(admin.email);
    if (!userExists) {
      await this.userService.createUser(admin);
      console.log('Usuário inicial criado com sucesso');
    } else {
      console.log('Usuário inicial já existe');
    }
  }

  private async hashPassword(password: string) {
    const salt = await bcrypt.genSalt();
    return bcrypt.hash(password, salt);
  }
  async findUserByEmail(email: string): Promise<User | null> {
    try {
      const user = await this.userService.findUserByEmail(email);
      return user;
    } catch (error) {
      throw new UnauthorizedException('Erro ao buscar usuário');
    }
  }
  async validateUser({ email, password }: LoginDto): Promise<User> {
    // Implemente a busca do usuário pelo nome de usuário
    const user = await this.findUserByEmail(email); // Método fictício
    if (user && bcrypt.compareSync(password, user.password)) {
      return user;
    }
    throw new UnauthorizedException('Credenciais inválidas');
  }

  async login(loginDto: LoginDto) {
    const user = await this.validateUser(loginDto);
    const payload = { name: user.name, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
