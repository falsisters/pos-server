import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { prisma } from '../prisma';
import { CashierWithPermissions } from './cashier.type';
import { CashierPermission } from '@prisma/client';

@Injectable()
export class CashierService {
  constructor(private jwtService: JwtService) {}

  async getAllCashiers(data: { userId: string }) {
    const { userId } = data;

    return prisma.cashier.findMany({
      where: {
        userId,
      },
      include: {
        permissions: true,
      },
    });
  }

  async getCashierById(data: { id: string }) {
    const { id } = data;

    return prisma.cashier.findUnique({
      where: {
        id,
      },
      include: {
        permissions: true,
      },
    });
  }

  async validateCashier(data: { name: string; accessKey: string }) {
    const { name, accessKey } = data;

    const cashier = await prisma.cashier.findUnique({
      where: {
        name,
      },
      include: {
        permissions: true,
      },
    });

    return this.verifyAccessKey(accessKey, cashier);
  }

  async deleteCashier(data: { id: string }) {
    const { id } = data;

    return prisma.cashier.delete({
      where: {
        id,
      },
    });
  }

  async createCashier(data: {
    name: string;
    userId: string;
    accessKey: string;
    permission: Partial<CashierPermission[]>;
  }) {
    const { name, userId, accessKey, permission } = data;

    return prisma.cashier.create({
      data: {
        name,
        userId,
        accessKey,
        permissions: {
          create: permission.map((p) => ({
            name: p.name,
          })),
        },
      },
    });
  }

  async editCashier(data: {
    id: string;
    name?: string;
    accessKey?: string;
    permissions?: Partial<CashierPermission[]>;
  }) {
    const { id, name, accessKey, permissions } = data;

    await prisma.cashierPermission.deleteMany({
      where: {
        cashierId: id,
      },
    });

    return prisma.cashier.update({
      where: {
        id,
      },
      data: {
        name,
        accessKey,
        permissions: {
          create: permissions.map((p) => ({
            name: p.name,
          })),
        },
      },
    });
  }

  private async verifyAccessKey(
    accessKey: string,
    cashier: CashierWithPermissions,
  ) {
    if (accessKey === cashier.accessKey) {
      return this.login(cashier);
    }
  }

  private async login(cashier: CashierWithPermissions) {
    const payload = {
      id: cashier.id,
      name: cashier.name,
      permissions: cashier.permissions,
    };

    const cashierToken = {
      access_token: this.jwtService.sign(payload),
      name: cashier.name,
    };

    return cashierToken;
  }
}
