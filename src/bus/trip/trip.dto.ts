import { BusRouteDTO } from "../busRoute/busRoute.dto";

export class TripDTO {
  readonly id: number;
  readonly tripNumber: string;
  readonly startPoint: string;
  readonly endPoint: string;
  readonly estimatedTime: number;
  readonly cost: number;
  readonly startTime: Date;
  readonly endTime: Date;
}