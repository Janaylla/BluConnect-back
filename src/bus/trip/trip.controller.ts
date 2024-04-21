
import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { TripService } from './trip.service';
import { TripDTO } from './trip.dto';

@Controller('trips')
export class TripController {
  constructor(private tripService: TripService) {}

  @Post()
  async createTrip(@Body() tripDTO: TripDTO) {
    return this.tripService.createTrip(tripDTO);
  }

  @Get()
  async listTrips() {
    return this.tripService.listTrips();
  }

  @Get(':id')
  async getTrip(@Param('id') id: string) {
    return this.tripService.getTrip(Number(id));
  }

  @Put(':id')
  async updateTrip(@Param('id') id: string, @Body() tripDTO: TripDTO) {
    return this.tripService.updateTrip(Number(id), tripDTO);
  }

  @Delete(':id')
  async deleteTrip(@Param('id') id: string) {
    return this.tripService.deleteTrip(Number(id));
  }
}