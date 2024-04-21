import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { BusModule } from './bus/bus.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    BusModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  constructor() {}
}
