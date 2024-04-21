
import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { BusRouteService } from './busRoute.service';
import { BusRouteDTO } from './busRoute.dto';

@Controller('bus-routes')
export class BusRouteController {
  constructor(private busRouteService: BusRouteService) {}

  @Post()
  async createBusRoute(@Body() busRouteDTO: BusRouteDTO) {
    return this.busRouteService.createBusRoute(busRouteDTO);
  }

  @Get()
  async listBusRoutes() {
    return this.busRouteService.listBusRoutes();
  }

  @Get(':id')
  async getBusRoute(@Param('id') id: string) {
    return this.busRouteService.getBusRoute(Number(id));
  }

  @Put(':id')
  async updateBusRoute(@Param('id') id: string, @Body() busRouteDTO: BusRouteDTO) {
    return this.busRouteService.updateBusRoute(Number(id), busRouteDTO);
  }

  @Delete(':id')
  async deleteBusRoute(@Param('id') id: string) {
    return this.busRouteService.deleteBusRoute(Number(id));
  }
}