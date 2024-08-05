import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';
import { TravelScheduleDTO, TravelScheduleSearchDTO } from './travelSchedule.dto';

@Injectable()
export class TravelScheduleService {
  constructor(private prisma: PrismaService) {}

  async createTravelSchedule(data: TravelScheduleDTO) {
    return await this.prisma.travelSchedule.create({ data });
  }

  async listTravelSchedules({ limit, page }: TravelScheduleSearchDTO) {
    const pageSize = limit;

    const skip = (page - 1) * pageSize;
    const rows = await this.prisma.travelSchedule.findMany({
      orderBy: {
        time: 'asc',
      },
      take: +pageSize,
      skip,
      include: {
        trip: {
          
        }
      }
    });
    const count = await this.prisma.travelSchedule.count();
    return { rows, count };
  }

  async getTravelSchedule(id: number) {
    return await this.prisma.travelSchedule.findUnique({ where: { id } });
  }

  async updateTravelSchedule(id: number, data: TravelScheduleDTO) {
    return await this.prisma.travelSchedule.update({ where: { id }, data });
  }

  async deleteTravelSchedule(id: number) {
    return await this.prisma.travelSchedule.delete({ where: { id } });
  }
}
