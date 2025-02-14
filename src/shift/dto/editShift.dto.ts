import { IsString } from 'class-validator';

export class EditShiftDto {
  @IsString()
  id: string;

  @IsString()
  employee: string;
}
