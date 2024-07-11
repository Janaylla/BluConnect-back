-- DropForeignKey
ALTER TABLE "BusRoute" DROP CONSTRAINT "BusRoute_endBusStopId_fkey";

-- DropForeignKey
ALTER TABLE "BusRoute" DROP CONSTRAINT "BusRoute_startBusStopId_fkey";

-- DropForeignKey
ALTER TABLE "BusRoute" DROP CONSTRAINT "BusRoute_tripId_fkey";

-- AddForeignKey
ALTER TABLE "BusRoute" ADD CONSTRAINT "BusRoute_tripId_fkey" FOREIGN KEY ("tripId") REFERENCES "Trip"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BusRoute" ADD CONSTRAINT "BusRoute_startBusStopId_fkey" FOREIGN KEY ("startBusStopId") REFERENCES "BusStop"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BusRoute" ADD CONSTRAINT "BusRoute_endBusStopId_fkey" FOREIGN KEY ("endBusStopId") REFERENCES "BusStop"("id") ON DELETE CASCADE ON UPDATE CASCADE;
