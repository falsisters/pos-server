import { CashierPermission } from '@prisma/client';
import {
  IsArray,
  IsNotEmpty,
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
  @IsNumberString()
  @MaxLength(4)
  accessKey: string;

  @IsNotEmpty()
  @IsArray()
  permissions: Partial<CashierPermission[]>;
}
