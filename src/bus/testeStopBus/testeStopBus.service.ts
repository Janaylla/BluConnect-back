import { Inject, Injectable } from '@nestjs/common';
import { BusRouteService } from '../busRoute/busRoute.service';
import { BusStopService } from '../busStop/busStop.service';
import { TripService } from '../trip/trip.service';

@Injectable()
export class TesteStopBusService {
  constructor(
    @Inject(BusRouteService) private busRouteService: BusRouteService,
    @Inject(BusStopService) private busStopService: BusStopService,
    @Inject(TripService) private tripService: TripService,
  ) {
    this.createBusRoute().catch((err) => console.log(err));
  }
  private async createBusRoute() {
    const busStop1 = await this.busStopService.createBusStop({
      name: 'Blumenau - Ponto 1',
      latitude: 26.919212127207587,
      longitude: 49.05846839774502,
    });
    const busStop2 = await this.busStopService.createBusStop({
      name: 'Blumenau - Ponto 2',
      latitude: 26.912997418398568,
      longitude: 49.054830885067055,
    });
    const busStop3 = await this.busStopService.createBusStop({
      name: 'Blumenau - Ponto 3',
      latitude: 26.910812317821733,
      longitude: 49.04475366454811,
    });
    const busStop4 = await this.busStopService.createBusStop({
      name: 'Blumenau - Ponto 4',
      latitude: 26.90799086988525,
      longitude: 49.03289161500359,
    });
    const busStop5 = await this.busStopService.createBusStop({
      name: 'Blumenau - Ponto 5',
      latitude: -26.900475983090868,
      longitude: -49.004806739876365,
    });
    await this.tripService.createTrip({
      code: 'teste 1',
      routes: [
        {
          endBusStopId: busStop2.id,
          startBusStopId: busStop1.id,
          index: 0,
        },
        {
          endBusStopId: busStop3.id,
          startBusStopId: busStop2.id,
          index: 1,
        },
        {
          endBusStopId: busStop4.id,
          startBusStopId: busStop3.id,
          index: 2,
        },
        {
          endBusStopId: busStop5.id,
          startBusStopId: busStop4.id,
          index: 3,
        },
      ],
    });
    // const busRoute = await this.busRouteService.createBusRoute({
    //   endBusStopId: busStop2.id,
    //   startBusStopId: busStop1.id,
    //   tripId: trip1.id,
    //   index: 1,
    // });
    // const busRoute2 = await this.busRouteService.createBusRoute({
    //   endBusStopId: busStop3.id,
    //   startBusStopId: busStop2.id,
    //   tripId: trip1.id,
    //   index: 1,
    // });
    // const busRoute3 = await this.busRouteService.createBusRoute({
    //   endBusStopId: busStop4.id,
    //   startBusStopId: busStop3.id,
    //   tripId: trip1.id,
    //   index: 1,
    // });
    // const busRoute4 = await this.busRouteService.createBusRoute({
    //   endBusStopId: busStop5.id,
    //   startBusStopId: busStop4.id,
    //   tripId: trip1.id,
    //   index: 1,
    // });
  }
}
