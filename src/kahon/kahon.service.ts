import { Injectable } from '@nestjs/common';
import { prisma } from '../prisma';
import { CreateKahonDto } from './dto/createKahon.dto';
import {
  TransferFromDelivery,
  TransferFromProducts,
} from './dto/transferFromProducts.dto';
import { CreateKahonItemDto } from './dto/createKahonItem.dto';
import { UpdateKahonDto } from './dto/updateKahon.dto';
import { Kahon } from '@prisma/client';

@Injectable()
export class KahonService {
  async getAllKahonByCashierId(data: { id: string }) {
    const { id } = data;

    const kahon = await prisma.kahon.findMany({
      where: {
        cashierId: id,
      },
      include: {
        KahonItem: {
          include: {
            KahonItemModifier: true,
          },
        },
        KahonTransferredItem: {
          include: {
            price: {
              include: {
                product: true,
              },
            },
            KahonTransferredItemModifier: true,
          },
        },
        KahonTotalModifier: true,
      },
    });

    return kahon;
  }

  async getKahonById(data: { id: string }) {
    const { id } = data;
    return prisma.kahon.findUnique({
      where: {
        id,
      },
      include: {
        KahonItem: {
          include: {
            KahonItemModifier: true,
          },
        },
        KahonTransferredItem: {
          include: {
            KahonTransferredItemModifier: true,
          },
        },
        KahonTotalModifier: true,
      },
    });
  }

  async createKahon(data: { id: string; createKahonDto: CreateKahonDto }) {
    const { id, createKahonDto } = data;
    return prisma.kahon.create({
      data: {
        name: createKahonDto.name,
        cashierId: id,
      },
    });
  }

  async updateKahon(data: { id: string; updateKahonDto: UpdateKahonDto }) {
    const { id, updateKahonDto } = data;
    const { kahonItem, kahonTransferredItem, kahonTotalModifier } =
      updateKahonDto;
    return prisma.kahon.update({
      where: {
        id,
      },
      data: {
        name: updateKahonDto.name,
        KahonItem: {
          deleteMany: {},
          createMany: {
            data: kahonItem.map((item) => ({
              qty: item.qty,
              name: item.name,
              KahonItemModifier: {
                createMany: item.kahonItemModifier.map((modifier) => ({
                  index: modifier.index,
                  operation: modifier.operation,
                })),
              },
            })),
          },
        },

        KahonTransferredItem: {
          deleteMany: {},
          create: kahonTransferredItem.map((item) => ({
            qty: item.qty,
            name: item.name,
            price: {
              connect: {
                id: item.price.id,
              },
            },
            KahonTransferredItemModifier: {
              createMany: {
                data: item.kahonTransferredItemModifier.map((modifier) => ({
                  index: modifier.index,
                  operation: modifier.operation,
                })),
              },
            },
          })),
        },

        KahonTotalModifier: {
          deleteMany: {},
          createMany: {
            data: kahonTotalModifier.map((modifier) => ({
              index: modifier.index,
              operation: modifier.operation,
            })),
          },
        },
      },
    });
  }

  async deleteKahon(data: { id: string }) {
    const { id } = data;
    return prisma.kahon.delete({
      where: {
        id,
      },
    });
  }

  async transferStockToKahonFromProducts(data: {
    id: string;
    product: TransferFromProducts;
  }) {
    const { id, product } = data;
    await prisma.price.update({
      where: {
        id: product.price.id,
        type: product.price.type,
      },
      data: {
        stock: {
          decrement: product.qty,
        },
      },
    });

    let assignedKahon: Kahon;

    const kahonToday = await prisma.kahon.findFirst({
      where: {
        cashierId: id,
        createdAt: {
          gte: new Date(new Date().setHours(0, 0, 0, 0)),
          lt: new Date(new Date().setHours(23, 59, 59, 999)),
        },
      },
    });

    if (kahonToday) {
      assignedKahon = kahonToday;
    } else {
      assignedKahon = await prisma.kahon.create({
        data: {
          name: `Kahon ${new Date().toLocaleDateString()}`,
          cashier: {
            connect: {
              id,
            },
          },
        },
      });
    }

    return prisma.kahonTransferredItem.create({
      data: {
        kahon: {
          connect: {
            id: assignedKahon.id,
          },
        },
        price: {
          connect: {
            id: product.price.id,
          },
        },
        qty: product.qty,
      },
    });
  }

  async transferStockToKahonFromDelivery(data: {
    id: string;
    delivery: TransferFromDelivery;
  }) {
    const { id, delivery } = data;
    await prisma.deliveryItem.update({
      where: {
        id: delivery.id,
      },
      data: {
        status: 'RECEIVED',
      },
    });

    return prisma.kahonTransferredItem.create({
      data: {
        kahon: {
          connect: {
            id,
          },
        },
        price: {
          connect: {
            id: delivery.price.id,
          },
        },
        qty: delivery.qty,
      },
    });
  }

  async createKahonItem(data: { id: string; kahon: CreateKahonItemDto }) {
    const { id, kahon } = data;
    return prisma.kahonItem.create({
      data: {
        kahon: {
          connect: {
            id,
          },
        },
        name: kahon.name,
        qty: kahon.qty,
      },
    });
  }
}
