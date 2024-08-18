import { Prisma } from '@prisma/client';

export class Todos implements Prisma.ToDosCreateInput {
  id?: string;
  title: string;
  content?: string;
  createdAt?: string | Date;
  fineshedAt?: string | Date;
  isFavortite?: boolean;
  author: Prisma.UsersCreateNestedOneWithoutTodoInput;
}

export class TodosPatch implements Prisma.ToDosUpdateInput {
  title: string;
  content?: string;
  fineshedAt?: null | Date;
  isFavortite?: boolean;
}
