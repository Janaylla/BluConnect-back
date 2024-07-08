import { Injectable, Inject } from '@nestjs/common';
import { BusRouteDTO, RouteSearchDTO } from './busRoute.dto';
import { PrismaService } from 'src/database/PrismaService';
import { BusStopService } from '../busStop/busStop.service';

@Injectable()
export class BusRouteService {
  constructor(
    private prisma: PrismaService,
    @Inject(BusStopService) private busStopService: BusStopService,
  ) {}

  async createBusRoute(data: BusRouteDTO) {
    return await this.prisma.busRoute.create({ data });
  }

  async listBusRoutes() {
    return await this.prisma.busRoute.findMany();
  }

  async listRoutesPossibleRoutes(query: RouteSearchDTO) {
    const { from_id, to_id } = query;
    const to = await this.prisma.busRoute.findFirstOrThrow({
      where: { OR: [{ startBusStopId: +from_id }, { endBusStopId: +from_id }] },
    });
    const from = await this.prisma.busRoute.findFirstOrThrow({
      where: { OR: [{ startBusStopId: +to_id }, { endBusStopId: +to_id }] },
    });
    const max = to.index > from.index ? to.index : from.index;
    const min = to.index < from.index ? to.index : from.index;
    // Consulta as rotas com base nas paradas de ônibus de origem e destino
    const routes = await this.prisma.busRoute.findMany({
      where: {
        index: {
          gte: min,
          lte: max,
        },
      },
      orderBy: {
        index: 'asc', // Ordena as rotas pelo índice
      },
      include: {
        startBusStop: true,
        endBusStop: true,
      },
    });
    console.log(
      'routes',
      routes.map((route) => route.endBusStop),
    );
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
