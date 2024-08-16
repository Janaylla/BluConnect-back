import { Injectable } from '@nestjs/common';
import { BusRouteDTO, RouteSearchDTO } from './busRoute.dto';
import { PrismaService } from 'src/database/PrismaService';

@Injectable()
export class BusRouteService {
  constructor(private prisma: PrismaService) { }

  async createBusRoute(data: BusRouteDTO) {
    return await this.prisma.busRoute.create({ data });
  }

  async listRoutesPossibleRoutes(query: RouteSearchDTO) {
    const { from_id, to_id } = query;

    const toPossibily = await this.prisma.busRoute.findMany({
      where: { busStopId: +from_id },
    });

    const from = await this.prisma.busRoute.findFirst({
      where: {
        OR: toPossibily.map((b => ({
          tripId: b.tripId,
          busStop: {
            id: +to_id
          },
          index: {
            gt: b.index,
          }
        })))
      },
    });
    if (!from) return []
    const to = await this.prisma.busRoute.findFirst({
      where: {
        tripId: from.tripId,
        busStopId: +from_id
      },
    });
    if (!to) return []
    const max = to.index > from.index ? to.index : from.index;
    const min = to.index < from.index ? to.index : from.index;
    // Consulta as rotas com base nas paradas de ônibus de origem e destino
    const routes = await this.prisma.busRoute.findMany({
      where: {
        index: {
          gte: min,
          lte: max,
        },
        tripId: to.tripId
      },
      orderBy: {
        index: 'asc', // Ordena as rotas pelo índice
      },
      include: {
        busStop: true,
      },
    });
    return routes;
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
