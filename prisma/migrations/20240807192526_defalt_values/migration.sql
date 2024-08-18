/*
  Warnings:

  - You are about to drop the `_ActivitiesToLinks` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ActivitiesToUsers` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_GoalsToUsers` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_TodoToUsers` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `authorId` to the `Activities` table without a default value. This is not possible if the table is not empty.
  - Added the required column `authorId` to the `Goals` table without a default value. This is not possible if the table is not empty.
  - Added the required column `activitiesId` to the `Links` table without a default value. This is not possible if the table is not empty.
  - Added the required column `authorId` to the `Todo` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_ActivitiesToLinks" DROP CONSTRAINT "_ActivitiesToLinks_A_fkey";

-- DropForeignKey
ALTER TABLE "_ActivitiesToLinks" DROP CONSTRAINT "_ActivitiesToLinks_B_fkey";

-- DropForeignKey
ALTER TABLE "_ActivitiesToUsers" DROP CONSTRAINT "_ActivitiesToUsers_A_fkey";

-- DropForeignKey
ALTER TABLE "_ActivitiesToUsers" DROP CONSTRAINT "_ActivitiesToUsers_B_fkey";

-- DropForeignKey
ALTER TABLE "_GoalsToUsers" DROP CONSTRAINT "_GoalsToUsers_A_fkey";

-- DropForeignKey
ALTER TABLE "_GoalsToUsers" DROP CONSTRAINT "_GoalsToUsers_B_fkey";

-- DropForeignKey
ALTER TABLE "_TodoToUsers" DROP CONSTRAINT "_TodoToUsers_A_fkey";

-- DropForeignKey
ALTER TABLE "_TodoToUsers" DROP CONSTRAINT "_TodoToUsers_B_fkey";

-- AlterTable
ALTER TABLE "Activities" ADD COLUMN     "authorId" TEXT NOT NULL,
ALTER COLUMN "content" DROP NOT NULL,
ALTER COLUMN "createdAt" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "fineshedAt" DROP NOT NULL,
ALTER COLUMN "isFavortite" SET DEFAULT false;

-- AlterTable
ALTER TABLE "Goals" ADD COLUMN     "authorId" TEXT NOT NULL,
ALTER COLUMN "content" DROP NOT NULL,
ALTER COLUMN "createdAt" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "fineshedAt" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Links" ADD COLUMN     "activitiesId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Todo" ADD COLUMN     "authorId" TEXT NOT NULL,
ALTER COLUMN "content" DROP NOT NULL,
ALTER COLUMN "createdAt" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "fineshedAt" DROP NOT NULL,
ALTER COLUMN "isFavortite" SET DEFAULT false;

-- DropTable
DROP TABLE "_ActivitiesToLinks";

-- DropTable
DROP TABLE "_ActivitiesToUsers";

-- DropTable
DROP TABLE "_GoalsToUsers";

-- DropTable
DROP TABLE "_TodoToUsers";

-- AddForeignKey
ALTER TABLE "Todo" ADD CONSTRAINT "Todo_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Activities" ADD CONSTRAINT "Activities_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Goals" ADD CONSTRAINT "Goals_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Links" ADD CONSTRAINT "Links_activitiesId_fkey" FOREIGN KEY ("activitiesId") REFERENCES "Activities"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
