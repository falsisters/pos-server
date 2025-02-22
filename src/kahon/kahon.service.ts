import { Injectable } from '@nestjs/common';
import { prisma } from '../prisma';
import { CreateKahonDto } from './dto/createKahon.dto';
import {
  TransferFromDelivery,
  TransferFromProducts,
} from './dto/transferFromProducts.dto';
import { CreateKahonItemDto } from './dto/createKahonItem.dto';

@Injectable()
export class KahonService {
  async getAllKahonByCashierId(data: { id: string }) {
    const { id } = data;
    return prisma.kahon.findMany({
      where: {
        cashierId: id,
      },
    });
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

  async updateKahon(data: { id: string; createKahonDto: CreateKahonDto }) {
    const { id, createKahonDto } = data;
    return prisma.kahon.update({
      where: {
        id,
      },
      data: {
        name: createKahonDto.name,
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

    return prisma.kahonTransferredItem.create({
      data: {
        kahon: {
          connect: {
            id,
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
