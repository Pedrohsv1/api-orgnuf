import { Prisma } from '@prisma/client';

export class Goal implements Prisma.GoalsCreateInput {
  id?: string;
  title: string;
  createdAt?: string | Date;
  fineshedAt?: string | Date;
  days?: number[] | Prisma.GoalsCreatedaysInput;
  isCheck?: boolean;
  author: Prisma.UsersCreateNestedOneWithoutGoalsInput;
}

export class GoalPatch implements Prisma.GoalsUpdateInput {
  title: string;
  fineshedAt?: null | Date;
  isCheck?: boolean;
  days?: number[] | Prisma.GoalsCreatedaysInput;
}
