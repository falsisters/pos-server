import { ProductType } from '@prisma/client';
import { IsArray, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateDeliveryDto {
  @IsNotEmpty()
  total: number;

  @IsNotEmpty()
  driver: string;

  @IsArray()
  deliveryItems: DeliveryItemDto[];

  @IsOptional()
  attachments: Upload[];
}

export class Upload {
  fileName: string;
  path: string;
  file: Express.Multer.File;
}

export class DeliveryItemDto {
  @IsNotEmpty()
  productId: string;

  @IsNotEmpty()
  qty: number;

  @IsNotEmpty()
  price: number;

  @IsNotEmpty()
  type: ProductType;
}

export class EditDeliveryDto {
  @IsNotEmpty()
  total: number;

  @IsNotEmpty()
  driver: string;

  @IsArray()
  deliveryItems: DeliveryItemDto[];

  @IsOptional()
  attachments: Upload[];
}
