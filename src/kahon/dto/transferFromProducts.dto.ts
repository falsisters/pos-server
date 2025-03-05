import { ProductType } from '@prisma/client';

class PriceDto {
  id: string;
  type: ProductType;
}

export class TransferFromProducts {
  qty: number;
  name: string;
  price: PriceDto;
}

export class TransferFromDelivery {
  id: string;
  qty: number;
  price: PriceDto;
}
