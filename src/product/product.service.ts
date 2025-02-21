import { Injectable } from '@nestjs/common';
import { JwtPayload } from 'src/auth/jwt/jwt.type';
import { prisma } from '../prisma';
import { CreateProductDto } from './dto/createProduct.dto';
import { EditProductDto } from './dto/editProduct.dto';
import { UploadService } from 'src/upload/upload.service';

@Injectable()
export class ProductService {
  constructor(private uploadService: UploadService) {}

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
            SpecialPrice: true,
          },
        },
      },
    });
  }

  async getAllProductsByCashierId(data: { cashierId: string }) {
    const { cashierId } = data;

    const user = await prisma.user.findFirst({
      where: {
        Cashier: {
          some: {
            id: cashierId,
          },
        },
      },
    });

    return prisma.product.findMany({
      where: {
        userId: user.id,
      },
      include: {
        Price: {
          include: {
            Profit: true,
            SpecialPrice: true,
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
            SpecialPrice: true,
          },
        },
      },
    });
  }

  async createProduct(data: { user: JwtPayload; product: CreateProductDto }) {
    const { user, product } = data;
    const { name } = product;

    const url = await this.uploadService.uploadSingleFile(product.picture);

    return prisma.product.create({
      data: {
        name,
        picture: url,
        userId: user.id,
        Price: {
          create: product.price.map((p) => ({
            price: p.price,
            type: p.type,
            stock: p.stock,
            Profit: {
              create: p.profit.map((pr) => ({
                profit: pr.profit,
              })),
            },
            SpecialPrice: {
              create: p.specialPrice.map((sp) => ({
                specialPrice: sp.specialPrice,
                minimumQty: sp.minimumQty,
              })),
            },
          })),
        },
      },
      include: {
        Price: {
          include: {
            Profit: true,
            SpecialPrice: true,
          },
        },
      },
    });
  }

  async editProduct(data: { id: string; product: EditProductDto }) {
    const { id, product } = data;
    const { name } = product;

    const url = await this.uploadService.uploadSingleFile(product.picture);

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
        picture: url,
        Price: {
          create: product.price.map((p) => ({
            price: p.price,
            stock: p.stock,
            type: p.type,
            Profit: {
              create: p.profit.map((pr) => ({
                profit: pr.profit,
              })),
            },
            SpecialPrice: {
              create: p.specialPrice.map((sp) => ({
                specialPrice: sp.specialPrice,
                minimumQty: sp.minimumQty,
              })),
            },
          })),
        },
      },
      include: {
        Price: {
          include: {
            Profit: true,
            SpecialPrice: true,
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
