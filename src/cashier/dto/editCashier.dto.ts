import { IsNumberString, IsOptional, IsString } from 'class-validator';

export class EditCashierDto {
  @IsString()
  id: string;

  @IsString()
  @IsOptional()
  name: string;

  @IsNumberString()
  @IsOptional()
  accessKey: string;
}
