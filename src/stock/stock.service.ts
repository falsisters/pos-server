import { Injectable } from '@nestjs/common';
import { prisma } from '../prisma';
import { EditStockDto } from './dto/editStock.dto';

@Injectable()
export class StockService {
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

  async editStock(data: { product: EditStockDto }) {
    const { product } = data;
    return prisma.product.update({
      where: {
        id: product.id,
      },
      data: {
        Price: {
          updateMany: product.price.map((item) => ({
            where: {
              id: item.id,
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
