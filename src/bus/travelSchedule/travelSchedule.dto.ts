import {
    IsNumber,
    IsOptional,
    IsBoolean,
    IsNotEmpty,
    Min,
  } from 'class-validator';
  
  export class TravelScheduleDTO {
    @IsNumber()
    @IsNotEmpty()
    time: number;
  
    @IsBoolean()
    @IsOptional()
    monday?: boolean;
  
    @IsBoolean()
    @IsOptional()
    tuesday?: boolean;
  
    @IsBoolean()
    @IsOptional()
    wednesday?: boolean;
  
    @IsBoolean()
    @IsOptional()
    thursday?: boolean;
  
    @IsBoolean()
    @IsOptional()
    friday?: boolean;
  
    @IsBoolean()
    @IsOptional()
    saturday?: boolean;
  
    @IsBoolean()
    @IsOptional()
    sunday?: boolean;
  
    @IsNumber()
    @IsNotEmpty()
    tripId: number;
  }
  
  export class TravelScheduleSearchDTO {
    @IsOptional()
    @IsNumber()
    limit: number = 10;
  
    @IsOptional()
    @IsNumber()
    @Min(1)
    page: number = 1;
  }
  