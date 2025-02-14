import { Price, Product, Profit } from '@prisma/client';

export class EditProductDto {
  product: Partial<Product>;
  price: Partial<Price[]>;
  profit: Partial<Profit[]>;
}
