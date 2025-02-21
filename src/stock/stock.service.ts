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

    const attachments = await this.uploadService.uploadAttachments(
      product.attachments,
    );

    return prisma.$transaction(async (tx) => {
      const price = await prisma.price.findUnique({
        where: {
          id: product.price.id,
        },
      });

      if (!price) {
        throw new Error(`Price not found for product ${product.price.id}`);
      }

      await tx.price.update({
        where: { id: product.price.id },
        data: { stock: price.stock - product.qty },
      });

      return tx.transfer.create({
        data: {
          attachments,
          price: {
            connect: { id: product.price.id },
          },
          qty: product.qty,
          type: product.type,
        },
      });
    });
  }

  async editStock(data: { id: string; product: EditStockDto }) {
    const { product, id } = data;
    return prisma.product.update({
      where: {
        id,
      },
      data: {
        Price: {
          updateMany: product.price.map((item) => ({
            where: {
              id: item.id,
              type: item.type,
            },
            data: {
              stock: item.stock,
            },
          })),
        },
      },
    });
  }
}
