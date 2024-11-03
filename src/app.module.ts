import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { BusModule } from './bus/bus.module';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { PasswordRecoveryModule } from './auth/passwordRecovery/passwordRecovery.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    BusModule,
    PasswordRecoveryModule,
    AppModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  constructor() {}
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    });
  }
}
