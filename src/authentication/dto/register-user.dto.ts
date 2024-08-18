import { IsString, Length } from 'class-validator';

export class RegisterUserDto {
  @IsString()
  @Length(6, 18)
  username: string;

  @IsString()
  @Length(6, 12)
  password: string;

  @IsString()
  @Length(6, 100)
  name: string;

  @IsString()
  @Length(6, 100)
  email: string;
}
