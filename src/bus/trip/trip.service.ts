import { Injectable } from '@nestjs/common';
import { BusRouteCreateDTO, TripCreateDTO } from './trip.dto';
import { PrismaService } from 'src/database/PrismaService';
import { BusStopSearchDTO } from '../busStop/busStop.dto';
import { BusRouteDTO } from '../busRoute/busRoute.dto';
@Injectable()
export class TripService {
  constructor(private prisma: PrismaService) {}

  async createTrip(data: TripCreateDTO) {
    const { code, routes } = data;
    const trip = await this.prisma.trip.create({
      data: { code },
    });
    await this.createBusRoute(trip.id, routes);
  }
  private async createBusRoute(tripId: number, routes: BusRouteCreateDTO[]) {
    const tripRoutes: BusRouteDTO[] = routes.map((route) => {
      return {
        tripId: tripId,
        endBusStopId: route.endBusStopId,
        startBusStopId: route.startBusStopId,
        index: route.index,
      };
    });
    await this.prisma.busRoute.createMany({
      data: tripRoutes,
    });
  }

  async listTrips({ limit, page, search }: BusStopSearchDTO) {
    const pageSize = limit;

    const skip = (page - 1) * pageSize;
    const rows = await this.prisma.trip.findMany({
      orderBy: {
        code: 'asc',
      },
      where: {
        code: {
          contains: search,
          mode: 'insensitive',
        },
      },
      include: {
        busRoutes: {
          include: {
            startBusStop: true,
            endBusStop: true,
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
            startBusStop: true,
            endBusStop: true,
          },
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
