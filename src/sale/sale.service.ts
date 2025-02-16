import { Injectable } from '@nestjs/common';
import { prisma } from '../prisma';
import { CreateSaleDto } from './dto/createSale.dto';
import { EditSaleDto } from './dto/editSale.dto';

@Injectable()
export class SaleService {
  async getAllSalesByUserId(data: { id: string }) {
    const { id } = data;
    return prisma.user.findMany({
      where: {
        id,
      },
      include: {
        Cashier: {
          include: {
            Sale: {
              include: {
                items: {
                  include: {
                    product: true,
                  },
                },
              },
            },
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

    return prisma.sale.create({
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
  }

  async editSale(data: { id: string; sale: EditSaleDto }) {
    const { id, sale } = data;
    const { total, paymentMethod, saleItems } = sale;

    await prisma.saleItem.deleteMany({ where: { saleId: id } });

    return prisma.sale.update({
      where: {
        id,
      },
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
  }

  async deleteSale(data: { id: string }) {
    const { id } = data;
    return prisma.sale.delete({
      where: {
        id,
      },
    });
  }
}
