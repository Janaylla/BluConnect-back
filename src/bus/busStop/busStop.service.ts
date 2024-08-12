import { Injectable } from '@nestjs/common';
import { BusStopDTO, BusStopSearchDTO } from './busStop.dto';
import { PrismaService } from 'src/database/PrismaService';

@Injectable()
export class BusStopService {
  constructor(private prisma: PrismaService) { }

  async createBusStop(data: BusStopDTO) {
    return await this.prisma.busStop.create({ data });
  }

  async listBusStops({ limit, page, search, asc, latitude, longitude, name, order }: BusStopSearchDTO) {
    const pageSize = limit;

    const skip = (page - 1) * pageSize;
    const rows = await this.prisma.busStop.findMany({
      orderBy: {
        [order]: asc,
      },
      where: {
        name: {
          contains: search,
          mode: 'insensitive',
        },
        ...(latitude ? { latitude: +latitude } : null),
        ...(longitude ? { longitude: +longitude } : null),
        ...(name ? {
          name: {
            contains: name,
            mode: 'insensitive',
          }
        } : null),
      },
      take: +pageSize,
      skip,
    });
    const count = await this.prisma.busStop.count({
      where: {
        name: {
          contains: search,
          mode: 'insensitive',
        },
      },
    });
    return { rows, count };
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
