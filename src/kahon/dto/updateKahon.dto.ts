import { OperationType, ProductType } from '@prisma/client';
import { IsArray, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

class PriceDto {
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  @IsNumber()
  qty: number;

  @IsNotEmpty()
  type: ProductType;
}

class KahonItem {
  @IsNotEmpty()
  @IsNumber()
  qty: number;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  value: number;

  kahonItemModifier: KahonItemModifier[];
}

class KahonTransferredItem {
  @IsNotEmpty()
  @IsNumber()
  qty: number;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  value: number;

  @IsNotEmpty()
  price: PriceDto;

  kahonTransferredItemModifier: KahonTransferredItemModifier[];
}

class KahonTotalModifier {
  @IsNotEmpty()
  @IsNumber()
  index: number;

  @IsNotEmpty()
  operation: OperationType;

  @IsNotEmpty()
  @IsNumber()
  value: number;
}

class KahonItemModifier {
  @IsNotEmpty()
  @IsNumber()
  index: number;

  @IsNotEmpty()
  operation: OperationType;

  @IsNotEmpty()
  @IsNumber()
  value: number;
}

class KahonTransferredItemModifier {
  @IsNotEmpty()
  @IsNumber()
  index: number;

  @IsNotEmpty()
  operation: OperationType;

  @IsNotEmpty()
  @IsNumber()
  value: number;
}

export class UpdateKahonDto {
  @IsNotEmpty()
  id: string;

  @IsOptional()
  name: string;

  @IsArray()
  @IsOptional()
  kahonItem: KahonItem[];

  @IsArray()
  @IsOptional()
  kahonTransferredItem: KahonTransferredItem[];

  @IsArray()
  @IsOptional()
  kahonTotalModifier: KahonTotalModifier[];
}
