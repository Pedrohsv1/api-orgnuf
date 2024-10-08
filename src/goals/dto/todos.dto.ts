import { Prisma } from '@prisma/client';
import { IsBoolean, IsDate, IsString, Length } from 'class-validator';

export class CreateGoalDto {
  @IsString()
  @Length(3, 100)
  title: string;

  days: Prisma.GoalsCreatedaysInput;
}

export class PatchGoalDto {
  @IsString()
  @Length(3, 100)
  title?: string;

  @IsDate()
  fineshedAt?: null | Date;

  @IsBoolean()
  isCheck?: boolean;

  days?: Prisma.GoalsCreatedaysInput;
}
