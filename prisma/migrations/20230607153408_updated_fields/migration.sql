-- CreateEnum
CREATE TYPE "DocumentCategory" AS ENUM ('MANUSCRIPT', 'PRINT', 'IMAGE');

-- CreateEnum
CREATE TYPE "EventType" AS ENUM ('EARTHQUAKE', 'FLOOD', 'HURRICANE', 'ERUPTION', 'FIRE', 'STORM', 'DROUGHT', 'PLAGUE');

-- CreateTable
CREATE TABLE "places" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "latitude" DOUBLE PRECISION,
    "longitude" DOUBLE PRECISION,

    CONSTRAINT "Place_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "events" (
    "id" TEXT NOT NULL,
    "year" INTEGER,
    "type" "EventType" NOT NULL,
    "placeId" TEXT NOT NULL,

    CONSTRAINT "events_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DocumentData" (
    "id" TEXT NOT NULL,
    "type" "DocumentCategory" NOT NULL,
    "imageId" TEXT,
    "manuscriptId" TEXT,
    "printId" TEXT,

    CONSTRAINT "DocumentData_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "images" (
    "id" TEXT NOT NULL,
    "artist" TEXT,
    "author" TEXT,
    "title" TEXT,
    "museum" TEXT,
    "content" TEXT,
    "date" TEXT,
    "summary" TEXT,
    "link" TEXT,
    "eventId" TEXT,
    "placeId" TEXT,

    CONSTRAINT "images_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "manuscripts" (
    "id" TEXT NOT NULL,
    "author" TEXT,
    "recipient" TEXT,
    "language" TEXT,
    "summary" TEXT,
    "link" TEXT,
    "archive" TEXT,
    "writtenAt" TEXT,
    "receivedAt" TEXT,
    "fromPlaceId" TEXT,
    "toPlaceId" TEXT,
    "eventId" TEXT,

    CONSTRAINT "manuscripts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "prints" (
    "id" TEXT NOT NULL,
    "language" TEXT,
    "title" TEXT,
    "year" TEXT,
    "notes" TEXT,
    "USTC" TEXT,
    "writer" TEXT,
    "information" TEXT,
    "dedicatee" TEXT,
    "summary" TEXT,
    "author" TEXT,
    "link" TEXT,
    "eventId" TEXT,
    "placeId" TEXT,
    "otherPlaces" TEXT[],

    CONSTRAINT "prints_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Place_name_key" ON "places"("name");

-- CreateIndex
CREATE UNIQUE INDEX "events_year_type_placeId_key" ON "events"("year", "type", "placeId");

-- AddForeignKey
ALTER TABLE "events" ADD CONSTRAINT "events_placeId_fkey" FOREIGN KEY ("placeId") REFERENCES "places"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DocumentData" ADD CONSTRAINT "DocumentData_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "images"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DocumentData" ADD CONSTRAINT "DocumentData_manuscriptId_fkey" FOREIGN KEY ("manuscriptId") REFERENCES "manuscripts"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DocumentData" ADD CONSTRAINT "DocumentData_printId_fkey" FOREIGN KEY ("printId") REFERENCES "prints"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "images" ADD CONSTRAINT "images_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "events"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "images" ADD CONSTRAINT "images_placeId_fkey" FOREIGN KEY ("placeId") REFERENCES "places"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "manuscripts" ADD CONSTRAINT "manuscripts_fromPlaceId_fkey" FOREIGN KEY ("fromPlaceId") REFERENCES "places"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "manuscripts" ADD CONSTRAINT "manuscripts_toPlaceId_fkey" FOREIGN KEY ("toPlaceId") REFERENCES "places"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "manuscripts" ADD CONSTRAINT "manuscripts_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "events"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "prints" ADD CONSTRAINT "prints_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "events"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "prints" ADD CONSTRAINT "prints_placeId_fkey" FOREIGN KEY ("placeId") REFERENCES "places"("id") ON DELETE SET NULL ON UPDATE CASCADE;
