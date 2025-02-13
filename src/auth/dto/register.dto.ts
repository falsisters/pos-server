import { IsEmail, IsString, MinLength } from 'class-validator';

export class RegisterDto {
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(4)
  name: string;

  @IsString()
  @MinLength(8)
  password: string;
}
