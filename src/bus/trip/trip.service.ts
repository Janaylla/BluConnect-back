import { Injectable } from '@nestjs/common';
import { BusRouteCreateDTO, TripCreateDTO, TripSearchDTO } from './trip.dto';
import { PrismaService } from 'src/database/PrismaService';
import { BusRouteDTO } from '../busRoute/busRoute.dto';
@Injectable()
export class TripService {
  constructor(private prisma: PrismaService) { }

  async createTrip(data: TripCreateDTO) {
    const { code, routes } = data;
    const averageTime = routes.reduce((a, b) => a + b.timeAvaragePlus, 0)
    const routesSort = data.routes.sort((a, b) => a.index - b.index);

    const trip = await this.prisma.trip.create({
      data: { code, averageTime, startBusStopId: routesSort[0].busStopId, endBusStopId: routesSort[routesSort.length - 1].busStopId },
    });
    await this.createBusRoute(trip.id, routes);
  }
  private async createBusRoute(tripId: number, routes: BusRouteCreateDTO[]) {
    const tripRoutes: BusRouteDTO[] = routes.map((route) => {
      return {
        tripId: tripId,
        busStopId: route.busStopId,
        index: route.index,
        averagTimePlus: route.timeAvaragePlus
      };
    });
    await this.prisma.busRoute.createMany({
      data: tripRoutes,
    });
  }

  async listTrips({ limit, page, search, asc, code, order }: TripSearchDTO) {
    const pageSize = limit;

    const skip = (page - 1) * pageSize;
    const rows = await this.prisma.trip.findMany({
      orderBy: {
        [order]: asc,
      },
      where: {
        code: {
          contains: search,
          mode: 'insensitive',
        },
        ...(code ? {
          code: {
            contains: code,
            mode: 'insensitive',
          }
        } : null)
      },
      include: {
        busRoutes: {
          include: {
            busStop: true,
          },
        },
      },
      take: +pageSize,
      skip,
    });
    const count = await this.prisma.trip.count({
      where: {
        code: {
          contains: search,
          mode: 'insensitive',
        },
      },
    });
    return { rows, count };
  }

  async getTrip(id: number) {
    return await this.prisma.trip.findUnique({
      where: { id },
      include: {
        busRoutes: {
          include: {
            busStop: true,
          },
          orderBy: {
            index: 'asc'
          }
        },
      },
    });
  }

  async updateTrip(id: number, data: TripCreateDTO) {
    await this.prisma.trip.update({ where: { id }, data: { code: data.code } });
    await this.prisma.busRoute.deleteMany({ where: { tripId: id } });
    await this.createBusRoute(id, data.routes);
  }

  async deleteTrip(id: number) {
    return await this.prisma.trip.delete({ where: { id } });
  }
}
