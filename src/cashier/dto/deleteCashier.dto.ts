import { IsNotEmpty, IsString } from 'class-validator';

export class DeleteCashierDto {
  @IsString()
  @IsNotEmpty()
  id: string;
}
