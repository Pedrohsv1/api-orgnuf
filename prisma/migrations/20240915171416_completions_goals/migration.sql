-- CreateTable
CREATE TABLE "CompletionGoals" (
    "id" TEXT NOT NULL,
    "goalId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CompletionGoals_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CompletionGoals" ADD CONSTRAINT "CompletionGoals_goalId_fkey" FOREIGN KEY ("goalId") REFERENCES "Goals"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
