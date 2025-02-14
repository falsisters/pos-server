import { IsString } from 'class-validator';

export class CreateShiftDto {
  @IsString()
  cashierId: string;

  @IsString()
  employee: string;
}
