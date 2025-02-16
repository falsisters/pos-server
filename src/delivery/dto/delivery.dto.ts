import { ProductType } from '@prisma/client';
import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateDeliveryDto {
  @IsNotEmpty()
  total: number;

  @IsNotEmpty()
  driver: string;

  @IsArray()
  deliveryItems: DeliveryItemDto[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  attachments?: string[];
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
  @IsArray()
  @IsString({ each: true })
  attachments?: string[];
}
