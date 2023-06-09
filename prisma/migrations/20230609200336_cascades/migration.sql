-- DropForeignKey
ALTER TABLE "DocumentData" DROP CONSTRAINT "DocumentData_imageId_fkey";

-- DropForeignKey
ALTER TABLE "DocumentData" DROP CONSTRAINT "DocumentData_manuscriptId_fkey";

-- DropForeignKey
ALTER TABLE "DocumentData" DROP CONSTRAINT "DocumentData_printId_fkey";

-- AddForeignKey
ALTER TABLE "DocumentData" ADD CONSTRAINT "DocumentData_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "images"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DocumentData" ADD CONSTRAINT "DocumentData_manuscriptId_fkey" FOREIGN KEY ("manuscriptId") REFERENCES "manuscripts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DocumentData" ADD CONSTRAINT "DocumentData_printId_fkey" FOREIGN KEY ("printId") REFERENCES "prints"("id") ON DELETE CASCADE ON UPDATE CASCADE;
