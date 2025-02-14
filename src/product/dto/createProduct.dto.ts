import { Price, Product, Profit } from '@prisma/client';
import { IsNotEmptyObject } from 'class-validator';

export class CreateProductDto {
  @IsNotEmptyObject()
  product: Partial<Product>;

  @IsNotEmptyObject()
  price: Partial<Price[]>;

  @IsNotEmptyObject()
  profit: Partial<Profit[]>;
}
