import { PaymentMethod, ProductType } from '@prisma/client';
import { IsArray, IsNotEmpty } from 'class-validator';

export class CreateSaleDto {
  @IsNotEmpty()
  total: number;

  @IsNotEmpty()
  paymentMethod: PaymentMethod;

  @IsArray()
  saleItems: SaleItemDto[];
}

class SaleItemDto {
  @IsNotEmpty()
  productId: string;

  @IsNotEmpty()
  qty: number;

  @IsNotEmpty()
  price: number;

  @IsNotEmpty()
  type: ProductType;
}
