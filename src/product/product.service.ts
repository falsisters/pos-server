import { Injectable } from '@nestjs/common';
import { Price, Product, Profit } from '@prisma/client';
import { AuthService } from 'src/auth/auth.service';
import { JwtPayload } from 'src/auth/jwt/jwt.type';
import { prisma } from 'src/prisma';

@Injectable()
export class ProductService {
  constructor(private authService: AuthService) {}

  async getAllProductsByUserId(data: { userId: string }) {
    const { userId } = data;
    return prisma.product.findMany({
      where: {
        userId,
      },
      include: {
        Price: {
          include: {
            Profit: true,
          },
        },
      },
    });
  }

  async getProductById(data: { id: string }) {
    const { id } = data;
    return prisma.product.findUnique({
      where: {
        id,
      },
      include: {
        Price: {
          include: {
            Profit: true,
          },
        },
      },
    });
  }

  async createProduct(data: {
    user: JwtPayload;
    product: Partial<Product>;
    price: Partial<Price[]>;
    profit: Partial<Profit[]>;
  }) {
    const { user, product, price, profit } = data;
    const { name, stock, minimumQty } = product;

    return prisma.product.create({
      data: {
        name,
        stock,
        minimumQty,
        userId: user.id,
        Price: {
          create: price.map((p) => ({
            price: p.price,
            type: p.type,
            Profit: {
              create: profit.map((pr) => ({
                profit: pr.profit,
              })),
            },
          })),
        },
      },
      include: {
        Price: {
          include: {
            Profit: true,
          },
        },
      },
    });
  }

  async editProduct(data: {
    id: string;
    product: Partial<Product>;
    price: Partial<Price[]>;
    profit: Partial<Profit[]>;
  }) {
    const { product, price, profit, id } = data;
    const { name, stock, minimumQty } = product;

    // Update prices related to the product
    price.map(async (p) => {
      await prisma.price.update({
        where: {
          id: p.id,
        },
        data: {
          price: p.price,
        },
      });

      // Update profits related to that price
      profit.map(async (pr) => {
        await prisma.profit.update({
          where: {
            id: pr.id,
          },
          data: {
            profit: pr.profit,
          },
        });
      });
    });

    // Update product last and return
    return await prisma.product.update({
      where: {
        id,
      },
      data: {
        name,
        stock,
        minimumQty,
      },
      include: {
        Price: {
          include: {
            Profit: true,
          },
        },
      },
    });
  }

  async deleteProduct(data: { id: string }) {
    const { id } = data;
    return prisma.product.delete({
      where: {
        id,
      },
    });
  }
}
