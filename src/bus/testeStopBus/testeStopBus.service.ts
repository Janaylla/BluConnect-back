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
    // const busStop1 = await this.busStopService.createBusStop({
    //   name: 'Blumenau - Ponto 1',
    //   latitude: 26.919212127207587,
    //   longitude: 49.05846839774502,
    // });
    // const busStop2 = await this.busStopService.createBusStop({
    //   name: 'Blumenau - Ponto 2',
    //   latitude: 26.912997418398568,
    //   longitude: 49.054830885067055,
    // });
    // const busStop3 = await this.busStopService.createBusStop({
    //   name: 'Blumenau - Ponto 3',
    //   latitude: 26.910812317821733,
    //   longitude: 49.04475366454811,
    // });
    // const busStop4 = await this.busStopService.createBusStop({
    //   name: 'Blumenau - Ponto 4',
    //   latitude: 26.90799086988525,
    //   longitude: 49.03289161500359,
    // });
    // const busStop5 = await this.busStopService.createBusStop({
    //   name: 'Blumenau - Ponto 5',
    //   latitude: -26.900475983090868,
    //   longitude: -49.004806739876365,
    // });
    // const trip1 = await this.tripService.createTrip({
    //   tripNumber: 1,
    // });
  }
}
