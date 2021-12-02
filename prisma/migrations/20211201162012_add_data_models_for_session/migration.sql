/*
  Warnings:

  - A unique constraint covering the columns `[telephone]` on the table `Participant` will be added. If there are existing duplicate values, this will fail.
  - Made the column `name` on table `Participant` required. This step will fail if there are existing NULL values in that column.
  - Made the column `telephone` on table `Participant` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Participant" ADD COLUMN     "familleId" INTEGER,
ALTER COLUMN "email" DROP NOT NULL,
ALTER COLUMN "name" SET NOT NULL,
ALTER COLUMN "telephone" SET NOT NULL;

-- CreateTable
CREATE TABLE "Session" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TirageAuSort" (
    "id" SERIAL NOT NULL,
    "sessionId" INTEGER,

    CONSTRAINT "TirageAuSort_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Duo" (
    "id" SERIAL NOT NULL,
    "tirageAuSortId" INTEGER NOT NULL,
    "participantId" INTEGER NOT NULL,
    "beneficiaireId" INTEGER NOT NULL,

    CONSTRAINT "Duo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Famille" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "sessionId" INTEGER,

    CONSTRAINT "Famille_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Participant_telephone_key" ON "Participant"("telephone");

-- AddForeignKey
ALTER TABLE "TirageAuSort" ADD CONSTRAINT "TirageAuSort_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "Session"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Duo" ADD CONSTRAINT "Duo_tirageAuSortId_fkey" FOREIGN KEY ("tirageAuSortId") REFERENCES "TirageAuSort"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Duo" ADD CONSTRAINT "Duo_participantId_fkey" FOREIGN KEY ("participantId") REFERENCES "Participant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Duo" ADD CONSTRAINT "Duo_beneficiaireId_fkey" FOREIGN KEY ("beneficiaireId") REFERENCES "Participant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Participant" ADD CONSTRAINT "Participant_familleId_fkey" FOREIGN KEY ("familleId") REFERENCES "Famille"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Famille" ADD CONSTRAINT "Famille_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "Session"("id") ON DELETE SET NULL ON UPDATE CASCADE;
