import { IsArray, IsNotEmpty } from 'class-validator';
import { ProductType } from '@prisma/client';

class Upload {
  fileName: string;
  path: string;
  file: Express.Multer.File;
}

export class EditProductDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  picture: Upload;

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
