import { IsString } from 'class-validator';

export class ClockShiftDto {
  @IsString()
  id: string;
}
