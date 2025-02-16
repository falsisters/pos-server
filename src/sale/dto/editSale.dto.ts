import { PaymentMethod, ProductType } from '@prisma/client';
import { IsArray, IsNotEmpty } from 'class-validator';

export class EditSaleDto {
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
