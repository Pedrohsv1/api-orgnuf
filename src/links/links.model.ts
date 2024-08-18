import { Prisma } from '@prisma/client';

export class LinksPatch implements Prisma.LinksUpdateInput {
  link?: string | Prisma.StringFieldUpdateOperationsInput;
  name?: string | Prisma.StringFieldUpdateOperationsInput;
}
