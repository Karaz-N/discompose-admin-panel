/*
  Warnings:

  - A unique constraint covering the columns `[year,type,placeId]` on the table `events` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "events_year_type_placeId_key" ON "events"("year", "type", "placeId");
