import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { prisma } from 'src/prisma';
import { CashierWithPermissions } from './cashier.type';

@Injectable()
export class CashierService {
  constructor(private jwtService: JwtService) {}

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
  }) {
    const { name, userId, accessKey } = data;

    return prisma.cashier.create({
      data: {
        name,
        userId,
        accessKey,
      },
    });
  }

  async editCashier(data: { id: string; name?: string; accessKey?: string }) {
    const { id, name, accessKey } = data;

    return prisma.cashier.update({
      where: {
        id,
      },
      data: {
        name,
        accessKey,
      },
    });
  }

  private async verifyAccessKey(
    accessKey: string,
    cashier: CashierWithPermissions,
  ) {
    if (accessKey === cashier.accessKey) {
      this.login(cashier);
    }
  }

  private async login(cashier: CashierWithPermissions) {
    const payload = {
      id: cashier.id,
      name: cashier.name,
      permissions: cashier.permissions,
    };
    return {
      access_token: this.jwtService.sign(payload),
      name: cashier.name,
      permissions: cashier.permissions,
    };
  }
}
