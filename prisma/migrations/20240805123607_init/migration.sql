/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `BusStop` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[code]` on the table `Trip` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateTable
CREATE TABLE "TralvelSchedules" (
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

    CONSTRAINT "TralvelSchedules_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "BusStop_name_key" ON "BusStop"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Trip_code_key" ON "Trip"("code");

-- AddForeignKey
ALTER TABLE "TralvelSchedules" ADD CONSTRAINT "TralvelSchedules_tripId_fkey" FOREIGN KEY ("tripId") REFERENCES "Trip"("id") ON DELETE CASCADE ON UPDATE CASCADE;
