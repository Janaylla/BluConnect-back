import { IsNotEmpty } from 'class-validator';
export class BusRouteDTO {
  readonly index: number;
  readonly tripId: number;
  readonly busStopId: number;
  readonly averagTimePlus: number;
}

export class BusRouteCreateDTO {
  @IsNotEmpty()
  readonly index: number;

  @IsNotEmpty()
  readonly tripId: number;

  @IsNotEmpty()
  readonly busStopId: number;

  @IsNotEmpty()
  readonly averagTimePlus: number;
}

export class RouteSearchDTO {
  @IsNotEmpty()
  from_id: number;

  @IsNotEmpty()
  to_id: number;
}
