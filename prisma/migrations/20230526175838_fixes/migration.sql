/*
  Warnings:

  - Added the required column `type` to the `documents` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "DocumentType" AS ENUM ('Manuscript', 'Print', 'Image');

-- AlterTable
ALTER TABLE "documents" ADD COLUMN     "printId" TEXT,
ADD COLUMN     "type" "DocumentType" NOT NULL;

-- AddForeignKey
ALTER TABLE "documents" ADD CONSTRAINT "documents_printId_fkey" FOREIGN KEY ("printId") REFERENCES "prints"("id") ON DELETE SET NULL ON UPDATE CASCADE;
