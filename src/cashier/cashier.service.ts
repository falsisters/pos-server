import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
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

  async createCashier(data: { name: string; userId: string }) {
    const { name, userId } = data;
    const accessKey = await this.encryptAccessKey(
      `${crypto.randomBytes(16).toString('hex')}`,
    );

    return prisma.cashier.create({
      data: {
        name,
        userId,
        accessKey,
      },
    });
  }

  async editCashier(data: { id: string; name?: string }) {
    const { id, name } = data;

    return prisma.cashier.update({
      where: {
        id,
      },
      data: {
        name,
      },
    });
  }

  private async verifyAccessKey(
    accessKey: string,
    cashier: CashierWithPermissions,
  ) {
    if (await bcrypt.compare(accessKey, cashier.accessKey)) {
      this.login(cashier);
    }
  }

  private async encryptAccessKey(accessKey: string) {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(accessKey, salt);
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
