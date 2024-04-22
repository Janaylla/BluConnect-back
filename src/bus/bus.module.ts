import { Module } from '@nestjs/common';
import { TripController } from './trip/trip.controller';
import { BusStopController } from './busStop/busStop.controller';
import { BusRouteController } from './busRoute/busRoute.controller';
import { TripService } from './trip/trip.service';
import { BusStopService } from './busStop/busStop.service';
import { BusRouteService } from './busRoute/busRoute.service';
import { PrismaService } from 'src/database/PrismaService';
@Module({
  imports: [
  ],
  controllers: [
    TripController,
    BusStopController,
    BusRouteController,
  ],
  providers: [
    TripService,
    BusStopService,
    BusRouteService,
    PrismaService,
  ],
  exports: [
    TripService,
    BusStopService,
    BusRouteService,
    PrismaService,
  ],
})
export class BusModule {}
