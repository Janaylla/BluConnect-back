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
import { TravelScheduleDTO, TravelScheduleSearchDTO } from './travelSchedule.dto';
import { TravelScheduleService } from './travelSchedule.service';
  
  @Controller('travel-schedule')
  export class TravelScheduleController {
    constructor(private travelScheduleService: TravelScheduleService) {}
  
    @Post()
    async createTravelSchedule(@Body() travelScheduleDTO: TravelScheduleDTO) {
      return this.travelScheduleService.createTravelSchedule(travelScheduleDTO);
    }
  
    @Get()
    async listTravelSchedules(@Query() query: TravelScheduleSearchDTO) {
      return this.travelScheduleService.listTravelSchedules(query);
    }
  
    @Get(':id')
    async getTravelSchedule(@Param('id') id: string) {
      return this.travelScheduleService.getTravelSchedule(Number(id));
    }
  
    @Put(':id')
    async updateTravelSchedule(@Param('id') id: string, @Body() travelScheduleDTO: TravelScheduleDTO) {
      return this.travelScheduleService.updateTravelSchedule(Number(id), travelScheduleDTO);
    }
  
    @Delete(':id')
    async deleteTravelSchedule(@Param('id') id: string) {
      return this.travelScheduleService.deleteTravelSchedule(Number(id));
    }
  }
  