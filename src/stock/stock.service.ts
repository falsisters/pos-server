import { Injectable } from '@nestjs/common';
import { prisma } from '../prisma';
import { EditStockDto } from './dto/editStock.dto';
import { TransferStockDto } from './dto/transferStock.dto';
import { UploadService } from 'src/upload/upload.service';

@Injectable()
export class StockService {
  constructor(private uploadService: UploadService) {}

  async getStockById(data: { id: string }) {
    const { id } = data;
    return prisma.product.findUnique({
      where: {
        id: id,
      },
      include: {
        Price: true,
      },
    });
  }

  async getAllStocks(data: { id: string }) {
    const { id } = data;
    return prisma.product.findMany({
      where: {
        userId: id,
      },
      include: {
        Price: true,
      },
    });
  }

  async getTransferById(data: { id: string }) {
    const { id } = data;
    return prisma.transfer.findUnique({
      where: {
        id,
      },
      include: {
        price: {
          include: {
            product: true,
          },
        },
      },
    });
  }

  async getAllTransfersByUserId(data: { id: string }) {
    const { id } = data;
    return prisma.transfer.findMany({
      where: {
        price: {
          product: {
            userId: id,
          },
        },
      },
      include: {
        price: {
          include: {
            product: true,
          },
        },
      },
    });
  }

  async transferStock(data: { product: TransferStockDto }) {
    const { product } = data;
    const productPrice = JSON.parse(product.price.toString());

    const attachments = await this.uploadService.uploadAttachments(
      product.attachments,
    );

    return prisma.$transaction(async (tx) => {
      const price = await prisma.price.findUnique({
        where: {
          id: productPrice.id,
        },
      });

      if (!price) {
        throw new Error(`Price not found for product ${productPrice.id}`);
      }

      const newStock =
        parseInt(productPrice.stock.toString()) -
        parseInt(product.qty.toString());

      await tx.price.update({
        where: { id: productPrice.id },
        data: {
          stock: newStock,
        },
      });

      return tx.transfer.create({
        data: {
          attachments,
          price: {
            connect: { id: productPrice.id },
          },
          qty: parseInt(product.qty.toString()),
          type: product.type,
        },
      });
    });
  }

  async editStock(data: { id: string; product: EditStockDto }) {
    const { product, id } = data;
    const productPrice = JSON.parse(product.price.toString());
    return prisma.product.update({
      where: {
        id,
      },
      data: {
        Price: {
          updateMany: productPrice.map((item) => ({
            where: {
              id: item.id,
              type: item.type,
            },
            data: {
              stock: parseInt(item.stock.toString()),
            },
          })),
        },
      },
    });
  }
}
