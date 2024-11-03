import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as nodemailer from 'nodemailer';
import * as bcrypt from 'bcryptjs';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class PasswordRecoveryService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
  ) {}

  async sendRecoveryEmail(email: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) throw new NotFoundException('Usuário não encontrado');

    const token = this.jwtService.sign({ userId: user.id }, { expiresIn: '5m' });
    const tokenExpires = new Date();
    tokenExpires.setMinutes(tokenExpires.getMinutes() + 5);

    await this.prisma.user.update({
      where: { email },
      data: {
        resetPasswordToken: token,
        resetTokenExpires: tokenExpires,
      },
    });

    const transporter = nodemailer.createTransport({
      service: 'Gmail', // ou outro provedor de e-mail
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Recuperação de Senha',
      text: `Use o seguinte token para redefinir sua senha: ${token}`,
    };

    await transporter.sendMail(mailOptions);
  }

  async resetPassword(token: string, newPassword: string) {
    const payload = this.jwtService.verify(token);

    const user = await this.prisma.user.findUnique({
      where: { id: payload.userId },
    });

    if (!user || user.resetPasswordToken !== token || new Date() > user.resetTokenExpires) {
      throw new UnauthorizedException('Token inválido ou expirado');
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await this.prisma.user.update({
      where: { id: user.id },
      data: {
        password: hashedPassword,
        resetPasswordToken: null,
        resetTokenExpires: null,
      },
    });
  }
}
