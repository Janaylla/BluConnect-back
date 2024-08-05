/*
  Warnings:

  - You are about to drop the `TralvelSchedules` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "TralvelSchedules" DROP CONSTRAINT "TralvelSchedules_tripId_fkey";

-- DropTable
DROP TABLE "TralvelSchedules";

-- CreateTable
CREATE TABLE "TravelSchedule" (
    "id" SERIAL NOT NULL,
    "time" INTEGER NOT NULL,
    "tripId" INTEGER NOT NULL,
    "monday" BOOLEAN NOT NULL DEFAULT false,
    "tuesday" BOOLEAN NOT NULL DEFAULT false,
    "wednesday" BOOLEAN NOT NULL DEFAULT false,
    "thursday" BOOLEAN NOT NULL DEFAULT false,
    "friday" BOOLEAN NOT NULL DEFAULT false,
    "saturday" BOOLEAN NOT NULL DEFAULT false,
    "sunday" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "TravelSchedule_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "TravelSchedule" ADD CONSTRAINT "TravelSchedule_tripId_fkey" FOREIGN KEY ("tripId") REFERENCES "Trip"("id") ON DELETE CASCADE ON UPDATE CASCADE;
