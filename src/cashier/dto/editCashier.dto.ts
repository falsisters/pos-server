import { IsString } from 'class-validator';

export class EditCashierDto {
  @IsString()
  id: string;

  @IsString()
  name: string;
}
