import { IsBoolean, IsDate, IsString, Length } from 'class-validator';

export class CreateTodoDto {
  @IsString()
  @Length(3, 100)
  title: string;

  @IsString()
  @Length(6)
  content?: string;
}

export class PatchTodoDto {
  @IsString()
  @Length(3, 100)
  title?: string;

  @IsString()
  @Length(6)
  content?: string;

  @IsBoolean()
  isFavorite?: boolean;

  @IsBoolean()
  isCheck?: boolean;

  @IsDate()
  fineshedAt?: null | Date;
}
