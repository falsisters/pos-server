import { ProductType } from '@prisma/client';
import { IsArray, IsNotEmpty } from 'class-validator';

export class EditStockDto {
  @IsNotEmpty()
  id: string;

  @IsArray()
  price: PriceDto[];
}

class PriceDto {
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  stock: number;

  @IsNotEmpty()
  type: ProductType;
}
