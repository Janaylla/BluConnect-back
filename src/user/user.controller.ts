import {
  Controller,
  Put,
  Get,
  Body,
  Param,
  Query,
  UseGuards,
  Request,
} from '@nestjs/common';
import { UserService } from './user.service'; // Ajuste o caminho conforme a estrutura do seu projeto
import { UpdateUser, UserSearchDTO } from './user.dto'; // Ajuste o caminho conforme a estrutura do seu projeto
import { JwtAuthGuard } from 'src/auth/guard/jwtAuthGuard';

@Controller('users')
@UseGuards(JwtAuthGuard) // Protegendo as rotas com o guard de autenticação JWT
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Put(':id/inactivate')
  async inactiveUser(@Param('id') id: number, @Request() req) {
    const requesterId = req.user.id; // Supondo que o ID do usuário autenticado esteja em req.user
    return this.userService.inactiveUser(requesterId, id);
  }

  @Put(':id')
  async updateUser(
    @Param('id') id: number,
    @Body() data: UpdateUser,
    @Request() req,
  ) {
    const requesterId = req.user.id;
    return this.userService.updateUser(requesterId, id, data);
  }

  @Get()
  async listUsers(@Query() query: UserSearchDTO, @Request() req) {
    const requesterId = req.user.id;
    return this.userService.listUsers(requesterId, query);
  }
}
