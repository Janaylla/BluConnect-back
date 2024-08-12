import { IsNotEmpty, IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class BusRouteCreateDTO {
  @IsNotEmpty()
  index: number;

  @IsNotEmpty()
  busStopId: number;
  
  @IsNumber()
  timeAvaragePlus: number
}
export class TripCreateDTO {
  @IsNotEmpty()
  code: string;

  @IsNotEmpty()
  routes: BusRouteCreateDTO[];
}

export class TripSearchDTO {
  @IsString()
  search: string;

  @IsOptional()
  @IsNumber()
  limit: number = 10;

  @IsOptional()
  @IsNumber()
  @Min(1)
  page: number = 1;

  @IsOptional()
  order: string;

  @IsOptional()
  asc: string = 'asc'

  @IsOptional()
  code: string
}
