import { Prisma } from '@prisma/client';
import { IsBoolean, IsDate, IsString, Length } from 'class-validator';

export class CreateActivitiesDto {
  @IsString()
  @Length(3, 100)
  title: string;

  @IsString()
  @Length(6, 300)
  content?: string;

  links?: Prisma.LinksCreateNestedManyWithoutActivitiesInput;
}

export class PatchActivitiesDto {
  @IsString()
  @Length(3, 100)
  title?: string;

  @IsString()
  @Length(6, 300)
  content?: string;

  @IsBoolean()
  isFavorite?: boolean;

  @IsDate()
  fineshedAt?: null | Date;

  @IsBoolean()
  isCheck?: boolean;

  links?: Prisma.LinksCreateNestedManyWithoutActivitiesInput;
}
