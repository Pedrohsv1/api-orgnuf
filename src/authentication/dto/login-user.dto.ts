import { IsString, Length } from 'class-validator';

export class LoginDto {
  @IsString()
  @Length(6, 100)
  username: string;

  @IsString()
  @Length(6, 100)
  password: string;
}
