import { ProductType } from '@prisma/client';

export class TransferFromProducts {
  qty: number;
  price: PriceDto;
}

export class TransferFromDelivery {
  id: string;
  qty: number;
  price: PriceDto;
}

class PriceDto {
  id: string;
  type: ProductType;
}
