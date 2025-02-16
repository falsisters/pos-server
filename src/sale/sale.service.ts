import { Injectable } from '@nestjs/common';
import { prisma } from '../prisma';
import { CreateSaleDto } from './dto/createSale.dto';
import { EditSaleDto } from './dto/editSale.dto';

@Injectable()
export class SaleService {
  async getAllSalesByUserId(data: { id: string }) {
    const { id } = data;

    return prisma.sale.findMany({
      where: {
        cashier: {
          user: {
            id,
          },
        },
      },
      include: {
        cashier: true,
        items: {
          include: {
            product: true,
          },
        },
      },
    });
  }

  async getAllSalesByCashierId(data: { id: string }) {
    const { id } = data;
    return prisma.sale.findMany({
      where: {
        cashierId: id,
      },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });
  }

  async getSaleById(data: { id: string }) {
    const { id } = data;
    return prisma.sale.findUnique({
      where: { id },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });
  }

  async createSale(data: { id: string; sale: CreateSaleDto }) {
    const { id, sale } = data;
    const { total, paymentMethod, saleItems } = sale;

    return prisma.$transaction(
      async (tx) => {
        // Update stocks for each item
        for (const item of saleItems) {
          const price = await tx.price.findFirst({
            where: {
              productId: item.productId,
              type: item.type,
            },
          });

          if (!price) {
            throw new Error(
              `Price not found for product ${item.productId} with type ${item.type}`,
            );
          }

          if (price.stock < item.qty) {
            throw new Error(`Insufficient stock for product ${item.productId}`);
          }

          await tx.price.update({
            where: { id: price.id },
            data: { stock: price.stock - item.qty },
          });
        }

        // Create the sale with items
        return tx.sale.create({
          data: {
            cashierId: id,
            total,
            paymentMethod,
            items: {
              create: saleItems.map((item) => ({
                qty: item.qty,
                price: item.price,
                type: item.type,
                product: {
                  connect: { id: item.productId },
                },
              })),
            },
          },
          include: {
            items: {
              include: {
                product: true,
              },
            },
          },
        });
      },
      {
        timeout: 10000,
      },
    );
  }

  async editSale(data: { id: string; sale: EditSaleDto }) {
    const { id, sale } = data;
    const { total, paymentMethod, saleItems } = sale;

    return prisma.$transaction(
      async (tx) => {
        // Get current sale items to restore their stocks
        const currentSale = await tx.sale.findUnique({
          where: { id },
          include: { items: true },
        });

        if (!currentSale) {
          throw new Error('Sale not found');
        }

        // Restore stocks from current items
        for (const item of currentSale.items) {
          const price = await tx.price.findFirst({
            where: {
              productId: item.productId,
              type: item.type,
            },
          });

          if (price) {
            await tx.price.update({
              where: { id: price.id },
              data: { stock: price.stock + item.qty },
            });
          }
        }

        // Deduct stocks for new items
        for (const item of saleItems) {
          const price = await tx.price.findFirst({
            where: {
              productId: item.productId,
              type: item.type,
            },
          });

          if (!price) {
            throw new Error(
              `Price not found for product ${item.productId} with type ${item.type}`,
            );
          }

          if (price.stock < item.qty) {
            throw new Error(`Insufficient stock for product ${item.productId}`);
          }

          await tx.price.update({
            where: { id: price.id },
            data: { stock: price.stock - item.qty },
          });
        }

        // Delete current items and create new ones
        await tx.saleItem.deleteMany({ where: { saleId: id } });

        return tx.sale.update({
          where: { id },
          data: {
            total,
            paymentMethod,
            items: {
              create: saleItems.map((item) => ({
                qty: item.qty,
                price: item.price,
                type: item.type,
                product: {
                  connect: { id: item.productId },
                },
              })),
            },
          },
          include: {
            items: {
              include: {
                product: true,
              },
            },
          },
        });
      },
      {
        timeout: 10000,
      },
    );
  }

  async deleteSale(data: { id: string }) {
    const { id } = data;

    return prisma.$transaction(
      async (tx) => {
        // Get current sale items to restore their stocks
        const currentSale = await tx.sale.findUnique({
          where: { id },
          include: { items: true },
        });

        if (!currentSale) {
          throw new Error('Sale not found');
        }

        // Restore stocks from current items
        for (const item of currentSale.items) {
          const price = await tx.price.findFirst({
            where: {
              productId: item.productId,
              type: item.type,
            },
          });

          if (price) {
            await tx.price.update({
              where: { id: price.id },
              data: { stock: price.stock + item.qty },
            });
          }
        }

        // Delete the sale
        return tx.sale.delete({
          where: { id },
        });
      },
      {
        timeout: 10000,
      },
    );
  }
}
