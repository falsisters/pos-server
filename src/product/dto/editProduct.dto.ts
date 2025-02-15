import { IsArray, IsNotEmpty } from 'class-validator';
import { ProductType } from '@prisma/client';

export class EditProductDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  stock: number;

  @IsNotEmpty()
  minimumQty: number;

  @IsArray()
  price: PriceDto[];
}

class PriceDto {
  @IsNotEmpty()
  price: number;

  @IsNotEmpty()
  type: ProductType;

  @IsArray()
  profit: ProfitDto[];
}

class ProfitDto {
  @IsNotEmpty()
  profit: number;
}
