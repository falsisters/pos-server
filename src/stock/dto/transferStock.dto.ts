import { ProductType, TransferType } from '@prisma/client';
import { IsNotEmpty, IsOptional } from 'class-validator';

class Upload {
  fileName: string;

  path: string;

  @IsOptional()
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
  @IsOptional()
  attachments: Upload[];

  @IsNotEmpty()
  qty: number;

  @IsNotEmpty()
  type: TransferType;

  @IsNotEmpty()
  price: PriceDto;
}
