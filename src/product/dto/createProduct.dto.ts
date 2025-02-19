import { IsArray, IsNotEmpty } from 'class-validator';
import { ProductType } from '@prisma/client';

export class CreateProductDto {
  @IsNotEmpty()
  name: string;

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

  @IsArray()
  specialPrice: SpecialPrice[];
}

class ProfitDto {
  @IsNotEmpty()
  profit: number;
}

class SpecialPrice {
  @IsNotEmpty()
  specialPrice: number;

  @IsNotEmpty()
  minimumQty: number;
}
