import { IsNotEmpty } from 'class-validator';
import { ProductType } from '@prisma/client';

export class EditProductDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  picture: Express.Multer.File;

  @IsNotEmpty()
  price: PriceDto[];
}
class PriceDto {
  @IsNotEmpty()
  price: number;

  @IsNotEmpty()
  stock: number;

  @IsNotEmpty()
  type: ProductType;

  @IsNotEmpty()
  profit: ProfitDto[];

  @IsNotEmpty()
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
