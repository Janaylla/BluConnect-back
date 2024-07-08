import { IsNotEmpty } from 'class-validator';
export class BusRouteDTO {
  readonly index: number;
  readonly tripId: number;
  readonly startBusStopId: number;
  readonly endBusStopId: number;
}

export class RouteSearchDTO {
  @IsNotEmpty()
  from_id: number;

  @IsNotEmpty()
  to_id: number;
}
