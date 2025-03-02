import { ProductType, TransferType } from '@prisma/client';
import { IsArray, IsNotEmpty } from 'class-validator';

class Upload {
  fileName: string;
  path: string;
  file: Express.Multer.File;
}

class PriceDto {
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  stock: number;

  @IsNotEmpty()
  type: ProductType;
}

export class TransferStockDto {
  attachments: Upload[];

  @IsNotEmpty()
  qty: number;

  @IsNotEmpty()
  type: TransferType;

  @IsArray()
  price: PriceDto;
}
