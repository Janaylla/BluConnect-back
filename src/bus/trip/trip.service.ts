
import { Injectable } from '@nestjs/common';
import { TripDTO } from './trip.dto';
import { PrismaService } from 'src/database/PrismaService';
@Injectable()
export class TripService {
  constructor(private prisma: PrismaService) {}

  async createTrip(data: TripDTO) {
    return await this.prisma.trip.create({ data });
  }

  async listTrips() {
    return await this.prisma.trip.findMany();
  }

  async getTrip(id: number) {
    return await this.prisma.trip.findUnique({ where: { id } });
  }

  async updateTrip(id: number, data: TripDTO) {
    return await this.prisma.trip.update({ where: { id }, data });
  }

  async deleteTrip(id: number) {
    return await this.prisma.trip.delete({ where: { id } });
  }
}