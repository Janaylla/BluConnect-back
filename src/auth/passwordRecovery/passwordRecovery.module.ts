import { Module } from "@nestjs/common";
import { PasswordRecoveryService } from "./passwordRecovery.controller";
import { PasswordRecoveryController } from "./passwordRecovery.service";
import { JwtModule } from "@nestjs/jwt";
import { PrismaModule } from "prisma/prisma.module";

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '5m' },
    }),
    PrismaModule, 
  ],
  controllers: [PasswordRecoveryController],
  providers: [PasswordRecoveryService],
  exports: [],
})
export class PasswordRecoveryModule { }
