import { IsString } from 'class-validator';

export class DeleteShiftDto {
  @IsString()
  id: string;
}
