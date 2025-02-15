import { Injectable } from '@nestjs/common';
import { JwtPayload } from 'src/auth/jwt/jwt.type';
import { prisma } from 'src/prisma';
import { CreateProductDto } from './dto/createProduct.dto';
import { EditProductDto } from './dto/editProduct.dto';

@Injectable()
export class ProductService {
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

  async createProduct(data: { user: JwtPayload; product: CreateProductDto }) {
    const { user, product } = data;
    const { name, stock, minimumQty } = product;

    return prisma.product.create({
      data: {
        name,
        stock,
        minimumQty,
        userId: user.id,
        Price: {
          create: product.price.map((p) => ({
            price: p.price,
            type: p.type,
            Profit: {
              create: p.profit.map((pr) => ({
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

  async editProduct(data: { id: string; product: EditProductDto }) {
    const { id, product } = data;
    const { name, stock, minimumQty } = product;

    await prisma.price.deleteMany({
      where: {
        productId: id,
      },
    });

    return prisma.product.update({
      where: {
        id,
      },
      data: {
        name,
        stock,
        minimumQty,
        Price: {
          create: product.price.map((p) => ({
            price: p.price,
            type: p.type,
            Profit: {
              create: p.profit.map((pr) => ({
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

  async deleteProduct(data: { id: string }) {
    const { id } = data;
    return prisma.product.delete({
      where: {
        id,
      },
    });
  }
}
