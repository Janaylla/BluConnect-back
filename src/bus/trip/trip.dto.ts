import { IsNotEmpty } from 'class-validator';

export class BusRouteCreateDTO {
  @IsNotEmpty()
  index: number;

  @IsNotEmpty()
  startBusStopId: number;

  @IsNotEmpty()
  endBusStopId: number;
}
export class TripCreateDTO {
  @IsNotEmpty()
  code: string;

  @IsNotEmpty()
  routes: BusRouteCreateDTO[];
}
