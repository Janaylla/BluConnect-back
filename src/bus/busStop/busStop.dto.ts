import {
  IsString,
  IsNumber,
  IsOptional,
  Min,
  IsNotEmpty,
} from 'class-validator';

export class BusStopDTO {
  @IsNumber()
  @IsNotEmpty()
  latitude: number;

  @IsNumber()
  @IsNotEmpty()
  longitude: number;

  @IsString()
  @IsNotEmpty()
  name: string;
}
export class BusStopSearchDTO {
  @IsString()
  search: string;

  @IsOptional()
  @IsNumber()
  limit: number = 10;

  @IsOptional()
  @IsNumber()
  @Min(1)
  page: number = 1;
}
