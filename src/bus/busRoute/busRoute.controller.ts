import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  Query,
} from '@nestjs/common';
import { BusRouteService } from './busRoute.service';
import { BusRouteDTO, RouteSearchDTO } from './busRoute.dto';

@Controller('bus-routes')
export class BusRouteController {
  constructor(private busRouteService: BusRouteService) {}

  @Post()
  async createBusRoute(@Body() busRouteDTO: BusRouteDTO) {
    return this.busRouteService.createBusRoute(busRouteDTO);
  }

  @Get('possible-routes')
  async listBusRoutes(@Query() query: RouteSearchDTO) {
    return this.busRouteService.listRoutesPossibleRoutes(query);
  }

  @Get('possible-routes')
  async listRoutesPossibleRoutes(@Query() query: RouteSearchDTO) {
    return this.busRouteService.listRoutesPossibleRoutes(query);
  }

  @Get(':id')
  async getBusRoute(@Param('id') id: string) {
    return this.busRouteService.getBusRoute(Number(id));
  }

  @Put(':id')
  async updateBusRoute(
    @Param('id') id: string,
    @Body() busRouteDTO: BusRouteDTO,
  ) {
    return this.busRouteService.updateBusRoute(Number(id), busRouteDTO);
  }

  @Delete(':id')
  async deleteBusRoute(@Param('id') id: string) {
    return this.busRouteService.deleteBusRoute(Number(id));
  }
}
