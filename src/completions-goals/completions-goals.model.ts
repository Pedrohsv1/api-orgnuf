import type { Prisma } from "@prisma/client";

export class CompletionGoal implements Prisma.CompletionGoalsCreateInput {
  goalId?: string;
  goal: Prisma.GoalsCreateNestedOneWithoutCompletionGoalsInput;
  createdAt?: Date;
  id?: string;
}

export class CompletionGoalResponse {
  id: string;
  goalId: string;
  createdAt: Date;
}