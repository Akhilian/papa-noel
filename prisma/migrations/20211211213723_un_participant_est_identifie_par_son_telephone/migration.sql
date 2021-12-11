/*
  Warnings:

  - The primary key for the `Participant` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Participant` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[telephone]` on the table `Participant` will be added. If there are existing duplicate values, this will fail.
  - Changed the type of `telephone` on the `Participant` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "Duo" DROP CONSTRAINT "Duo_beneficiaireId_fkey";

-- DropForeignKey
ALTER TABLE "Duo" DROP CONSTRAINT "Duo_participantId_fkey";

-- AlterTable
ALTER TABLE "Duo" ALTER COLUMN "participantId" SET DATA TYPE BIGINT,
ALTER COLUMN "beneficiaireId" SET DATA TYPE BIGINT;

-- AlterTable
ALTER TABLE "Participant" DROP CONSTRAINT "Participant_pkey",
DROP COLUMN "id",
DROP COLUMN "telephone",
ADD COLUMN     "telephone" BIGINT NOT NULL,
ADD CONSTRAINT "Participant_pkey" PRIMARY KEY ("telephone");

-- CreateIndex
CREATE UNIQUE INDEX "Participant_telephone_key" ON "Participant"("telephone");

-- AddForeignKey
ALTER TABLE "Duo" ADD CONSTRAINT "Duo_participantId_fkey" FOREIGN KEY ("participantId") REFERENCES "Participant"("telephone") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Duo" ADD CONSTRAINT "Duo_beneficiaireId_fkey" FOREIGN KEY ("beneficiaireId") REFERENCES "Participant"("telephone") ON DELETE RESTRICT ON UPDATE CASCADE;
