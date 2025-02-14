import {
  IsNumberString,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateCashierDto {
  @IsString()
  @MinLength(4)
  name: string;

  @IsString()
  userId: string;

  @IsString()
  @IsNumberString()
  @MaxLength(4)
  accessKey: string;
}
