import { IsEmail, IsString } from 'class-validator';

export class FindUserDto {
  @IsString()
  @IsEmail()
  email: string;
}
