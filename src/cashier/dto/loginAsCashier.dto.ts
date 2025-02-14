import { IsString } from 'class-validator';

export class LoginAsCashierDto {
  @IsString()
  name: string;

  @IsString()
  accessKey: string;
}
