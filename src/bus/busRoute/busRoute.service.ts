
import { Injectable } from '@nestjs/common';
import { BusRouteDTO } from './busRoute.dto';
import { PrismaService } from 'src/database/PrismaService';

@Injectable()
export class BusRouteService {
  constructor(private prisma: PrismaService) {}

  async createBusRoute(data: BusRouteDTO) {
    return await this.prisma.busRoute.create({ data });
  }

  async listBusRoutes() {
    return await this.prisma.busRoute.findMany();
  }

  async getBusRoute(id: number) {
    return await this.prisma.busRoute.findUnique({ where: { id } });
  }

  async updateBusRoute(id: number, data: BusRouteDTO) {
    return await this.prisma.busRoute.update({ where: { id }, data });
  }

  async deleteBusRoute(id: number) {
    return await this.prisma.busRoute.delete({ where: { id } });
  }
}