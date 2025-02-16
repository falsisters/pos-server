import { Injectable } from '@nestjs/common';
import { prisma } from '../prisma';
import { CreateDeliveryDto, EditDeliveryDto } from './dto/delivery.dto';

@Injectable()
export class DeliveryService {
  async createDelivery(data: { id: string; delivery: CreateDeliveryDto }) {
    const { id, delivery } = data;
    const { total, deliveryItems, attachments } = delivery;

    return prisma.$transaction(
      async (tx) => {
        // Update stocks for each item (INCREASE)
        for (const item of deliveryItems) {
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

          await tx.price.update({
            where: { id: price.id },
            data: { stock: price.stock + item.qty },
          });
        }

        // Create the delivery with items
        return tx.delivery.create({
          data: {
            cashierId: id,
            total,
            attachments: attachments || [],
            items: {
              create: deliveryItems.map((item) => ({
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
        timeout: 25000,
      },
    );
  }

  async editDelivery(data: { id: string; delivery: EditDeliveryDto }) {
    const { id, delivery } = data;
    const { total, deliveryItems, attachments } = delivery;

    return prisma.$transaction(
      async (tx) => {
        // Get current delivery items to revert their stocks
        const currentDelivery = await tx.delivery.findUnique({
          where: { id },
          include: { items: true },
        });

        if (!currentDelivery) {
          throw new Error('Delivery not found');
        }

        // Decrease stocks from current items (reverse the previous increase)
        for (const item of currentDelivery.items) {
          const price = await tx.price.findFirst({
            where: {
              productId: item.productId,
              type: item.type,
            },
          });

          if (price) {
            await tx.price.update({
              where: { id: price.id },
              data: { stock: price.stock - item.qty },
            });
          }
        }

        // Increase stocks for new items
        for (const item of deliveryItems) {
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

          await tx.price.update({
            where: { id: price.id },
            data: { stock: price.stock + item.qty },
          });
        }

        // Delete current items and create new ones
        await tx.deliveryItem.deleteMany({ where: { deliveryId: id } });

        return tx.delivery.update({
          where: { id },
          data: {
            total,
            attachments: attachments || [],
            items: {
              create: deliveryItems.map((item) => ({
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
        timeout: 25000,
      },
    );
  }

  async deleteDelivery(data: { id: string }) {
    const { id } = data;

    return prisma.$transaction(
      async (tx) => {
        // Get current delivery items to revert their stocks
        const currentDelivery = await tx.delivery.findUnique({
          where: { id },
          include: { items: true },
        });

        if (!currentDelivery) {
          throw new Error('Delivery not found');
        }

        // Decrease stocks from current items (reverse the increase)
        for (const item of currentDelivery.items) {
          const price = await tx.price.findFirst({
            where: {
              productId: item.productId,
              type: item.type,
            },
          });

          if (price) {
            await tx.price.update({
              where: { id: price.id },
              data: { stock: price.stock - item.qty },
            });
          }
        }

        // Delete the delivery
        return tx.delivery.delete({
          where: { id },
        });
      },
      {
        timeout: 25000,
      },
    );
  }

  async getAllDeliveriesByCashierId(data: { cashierId: string }) {
    const { cashierId } = data;

    return prisma.delivery.findMany({
      where: { cashierId },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async getAllDeliveriesByUserId(data: { userId: string }) {
    const { userId } = data;

    return prisma.delivery.findMany({
      where: {
        cashier: {
          userId,
        },
      },
      include: {
        items: {
          include: {
            product: true,
          },
        },
        cashier: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async getDeliveryById(data: { id: string }) {
    const { id } = data;

    return prisma.delivery.findUnique({
      where: { id },
      include: {
        items: {
          include: {
            product: true,
          },
        },
        cashier: true,
      },
    });
  }
}
