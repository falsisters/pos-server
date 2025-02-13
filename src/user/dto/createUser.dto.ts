import { IsString, IsEmail, MinLength } from 'class-validator';

export class CreateUserDto {
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
