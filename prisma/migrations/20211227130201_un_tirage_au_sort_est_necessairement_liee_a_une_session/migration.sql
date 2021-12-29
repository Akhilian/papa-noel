/*
  Warnings:

  - Made the column `sessionId` on table `TirageAuSort` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "TirageAuSort" DROP CONSTRAINT "TirageAuSort_sessionId_fkey";

-- AlterTable
ALTER TABLE "TirageAuSort" ALTER COLUMN "sessionId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "TirageAuSort" ADD CONSTRAINT "TirageAuSort_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "Session"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
