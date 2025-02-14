import { IsString, MinLength } from 'class-validator';

export class CreateCashierDto {
  @IsString()
  @MinLength(4)
  name: string;

  @IsString()
  userId: string;
}
