import { ProductType } from '@prisma/client';
import { IsArray, IsNotEmpty } from 'class-validator';

export class EditStockDto {
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
