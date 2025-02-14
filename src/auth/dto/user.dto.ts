import { IsString } from 'class-validator';

export class UserDataDto {
  @IsString()
  access_token: string;
}
