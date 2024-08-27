import { Prisma } from '@prisma/client';

export class IActivities implements Prisma.ActivitiesCreateInput {
  id?: string;
  title: string;
  content?: string;
  createdAt?: string | Date;
  fineshedAt?: string | Date;
  isFavorite?: boolean;
  isCheck?: boolean;
  author: Prisma.UsersCreateNestedOneWithoutTodoInput;
  links?: Prisma.LinksCreateNestedManyWithoutActivitiesInput;
  DeadLineEnd?: string | Date;
  DeadLineStart?: string | Date;
}

export class IActivitiesPatch implements Prisma.ActivitiesUpdateInput {
  title?: string;
  content?: string;
  fineshedAt?: null | Date;
  links?: Prisma.LinksUpdateManyWithoutActivitiesNestedInput;
  isFavorite?: boolean;
  isCheck?: boolean;
  DeadLineEnd?:
    | string
    | Date
    | Prisma.NullableDateTimeFieldUpdateOperationsInput;
  DeadLineStart?:
    | string
    | Date
    | Prisma.NullableDateTimeFieldUpdateOperationsInput;
}
