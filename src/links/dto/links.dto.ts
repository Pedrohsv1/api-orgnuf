import { IsString, Length } from 'class-validator';

export class PatchLinkTdo {
  @IsString()
  @Length(100)
  name?: string;

  @IsString()
  link?: string;
}
