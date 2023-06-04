/*
  Warnings:

  - Added the required column `type` to the `events` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "EventType" AS ENUM ('EARTHQUAKE', 'FLOOD', 'HURRICANE', 'ERUPTION');

-- AlterTable
ALTER TABLE "events" DROP COLUMN "type",
ADD COLUMN     "type" "EventType" NOT NULL;

-- AlterTable
ALTER TABLE "places" RENAME CONSTRAINT "places_pkey" TO "Place_pkey";

-- RenameIndex
ALTER INDEX "places_name_key" RENAME TO "Place_name_key";
