import { Injectable } from '@nestjs/common';
import { BusStopDTO } from './busStop.dto';
import { PrismaService } from 'src/database/PrismaService';

@Injectable()
export class BusStopService {
  constructor(private prisma: PrismaService) {}

  async createBusStop(data: BusStopDTO) {
    return await this.prisma.busStop.create({ data });
  }

  async listBusStops() {
    return await this.prisma.busStop.findMany();
  }

  async getBusStop(id: number) {
    return await this.prisma.busStop.findUnique({ where: { id } });
  }

  async updateBusStop(id: number, data: BusStopDTO) {
    return await this.prisma.busStop.update({ where: { id }, data });
  }

  async deleteBusStop(id: number) {
    return await this.prisma.busStop.delete({ where: { id } });
  }
}