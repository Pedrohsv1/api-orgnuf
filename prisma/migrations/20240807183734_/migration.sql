/*
  Warnings:

  - The primary key for the `Users` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "Users" DROP CONSTRAINT "Users_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Users_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Users_id_seq";

-- CreateTable
CREATE TABLE "Todo" (
    "id" TEXT NOT NULL,
    "title" VARCHAR(100) NOT NULL,
    "content" VARCHAR(300) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "fineshedAt" TIMESTAMP(3) NOT NULL,
    "isFavortite" BOOLEAN NOT NULL,

    CONSTRAINT "Todo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Activities" (
    "id" TEXT NOT NULL,
    "title" VARCHAR(100) NOT NULL,
    "content" VARCHAR(300) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "fineshedAt" TIMESTAMP(3) NOT NULL,
    "isFavortite" BOOLEAN NOT NULL,

    CONSTRAINT "Activities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Goals" (
    "id" TEXT NOT NULL,
    "title" VARCHAR(100) NOT NULL,
    "content" VARCHAR(300) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "fineshedAt" TIMESTAMP(3) NOT NULL,
    "days" TEXT[],

    CONSTRAINT "Goals_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Links" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "link" VARCHAR(300) NOT NULL,

    CONSTRAINT "Links_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_TodoToUsers" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_ActivitiesToLinks" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_ActivitiesToUsers" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_GoalsToUsers" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_TodoToUsers_AB_unique" ON "_TodoToUsers"("A", "B");

-- CreateIndex
CREATE INDEX "_TodoToUsers_B_index" ON "_TodoToUsers"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ActivitiesToLinks_AB_unique" ON "_ActivitiesToLinks"("A", "B");

-- CreateIndex
CREATE INDEX "_ActivitiesToLinks_B_index" ON "_ActivitiesToLinks"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ActivitiesToUsers_AB_unique" ON "_ActivitiesToUsers"("A", "B");

-- CreateIndex
CREATE INDEX "_ActivitiesToUsers_B_index" ON "_ActivitiesToUsers"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_GoalsToUsers_AB_unique" ON "_GoalsToUsers"("A", "B");

-- CreateIndex
CREATE INDEX "_GoalsToUsers_B_index" ON "_GoalsToUsers"("B");

-- AddForeignKey
ALTER TABLE "_TodoToUsers" ADD CONSTRAINT "_TodoToUsers_A_fkey" FOREIGN KEY ("A") REFERENCES "Todo"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TodoToUsers" ADD CONSTRAINT "_TodoToUsers_B_fkey" FOREIGN KEY ("B") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ActivitiesToLinks" ADD CONSTRAINT "_ActivitiesToLinks_A_fkey" FOREIGN KEY ("A") REFERENCES "Activities"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ActivitiesToLinks" ADD CONSTRAINT "_ActivitiesToLinks_B_fkey" FOREIGN KEY ("B") REFERENCES "Links"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ActivitiesToUsers" ADD CONSTRAINT "_ActivitiesToUsers_A_fkey" FOREIGN KEY ("A") REFERENCES "Activities"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ActivitiesToUsers" ADD CONSTRAINT "_ActivitiesToUsers_B_fkey" FOREIGN KEY ("B") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GoalsToUsers" ADD CONSTRAINT "_GoalsToUsers_A_fkey" FOREIGN KEY ("A") REFERENCES "Goals"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GoalsToUsers" ADD CONSTRAINT "_GoalsToUsers_B_fkey" FOREIGN KEY ("B") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
