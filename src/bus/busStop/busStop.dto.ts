import { IsString, IsNumber, IsOptional, Min } from "class-validator";

export interface BusStopDTO {
  latitude: number;
  longitude: number;
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