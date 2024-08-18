import { Prisma } from '@prisma/client';

export class Users implements Prisma.UsersCreateInput {
  email: string;
  name: string;
  password: string;
  username: string;
}
