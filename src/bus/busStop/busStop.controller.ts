import { Controller, Get, Post, Body, Param, Put, Delete, Query } from '@nestjs/common';
import { BusStopService } from './busStop.service';
import { BusStopDTO, BusStopSearchDTO } from './busStop.dto';

@Controller('bus-stops')
export class BusStopController {
  constructor(private busStopService: BusStopService) {}

  @Post()
  async createBusStop(@Body() busStopDTO: BusStopDTO) {
    return this.busStopService.createBusStop(busStopDTO);
  }

  @Get()
  async listBusStops(
    @Query() query: BusStopSearchDTO
  ) {
    return this.busStopService.listBusStops(query);
  }

  @Get(':id')
  async getBusStop(@Param('id') id: string) {
    return this.busStopService.getBusStop(Number(id));
  }

  @Put(':id')
  async updateBusStop(@Param('id') id: string, @Body() busStopDTO: BusStopDTO) {
    return this.busStopService.updateBusStop(Number(id), busStopDTO);
  }

  @Delete(':id')
  async deleteBusStop(@Param('id') id: string) {
    return this.busStopService.deleteBusStop(Number(id));
  }
}