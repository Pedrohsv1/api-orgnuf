/*
  Warnings:

  - You are about to drop the column `isFavortite` on the `Activities` table. All the data in the column will be lost.
  - You are about to drop the column `isFavortite` on the `ToDos` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Activities" DROP COLUMN "isFavortite",
ADD COLUMN     "isFavorite" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "ToDos" DROP COLUMN "isFavortite",
ADD COLUMN     "isFavorite" BOOLEAN NOT NULL DEFAULT false;
