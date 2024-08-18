/*
  Warnings:

  - The `days` column on the `Goals` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Goals" DROP COLUMN "days",
ADD COLUMN     "days" INTEGER[];
