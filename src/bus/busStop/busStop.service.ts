import { Injectable } from '@nestjs/common';
import { BusStopDTO, BusStopSearchDTO } from './busStop.dto';
import { PrismaService } from 'src/database/PrismaService';

@Injectable()
export class BusStopService {
  constructor(private prisma: PrismaService) {}

  async createBusStop(data: BusStopDTO) {
    return await this.prisma.busStop.create({ data });
  }

  async listBusStops({ limit, page, search }: BusStopSearchDTO) {
    const pageSize = limit;

    const skip = (page - 1) * pageSize;
    console.log('skip', skip, page, pageSize);
    return await this.prisma.busStop.findMany({
      orderBy: {
        name: 'asc',
      },
      where: {
        name: {
          contains: search,
          mode: 'insensitive',
        },
      },
      take: +pageSize,
      skip,
    });
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
