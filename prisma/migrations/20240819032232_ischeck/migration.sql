-- AlterTable
ALTER TABLE "Activities" ADD COLUMN     "isCheck" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "ToDos" ADD COLUMN     "isCheck" BOOLEAN NOT NULL DEFAULT false;
