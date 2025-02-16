import { IsArray, IsNotEmpty } from 'class-validator';
import { ProductType } from '@prisma/client';

export class CreateProductDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  minimumQty: number;

  @IsArray()
  price: PriceDto[];
}

class PriceDto {
  @IsNotEmpty()
  price: number;

  @IsNotEmpty()
  stock: number;

  @IsNotEmpty()
  type: ProductType;

  @IsArray()
  profit: ProfitDto[];
}

class ProfitDto {
  @IsNotEmpty()
  profit: number;
}
