import { Controller, Post, Body } from '@nestjs/common';
import { PasswordRecoveryService } from './passwordRecovery.controller';

@Controller('auth')
export class PasswordRecoveryController {
  constructor(private readonly passwordRecoveryService: PasswordRecoveryService) {}

  @Post('forgot-password')
  async forgotPassword(@Body('email') email: string) {
    await this.passwordRecoveryService.sendRecoveryEmail(email);
    return { message: 'E-mail de recuperação enviado' };
  }

  @Post('reset-password')
  async resetPassword(
    @Body('token') token: string,
    @Body('newPassword') newPassword: string,
  ) {
    await this.passwordRecoveryService.resetPassword(token, newPassword);
    return { message: 'Senha redefinida com sucesso' };
  }
}
