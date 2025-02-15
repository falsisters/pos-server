import { Injectable } from '@nestjs/common';
import { prisma } from '../prisma';

@Injectable()
export class ShiftService {
  async createShift(data: { cashierId: string; employee: string }) {
    const { cashierId, employee } = data;
    const dateNow = new Date().toISOString();

    return prisma.shift.create({
      data: {
        cashierId,
        employee,
        clockIn: dateNow,
        clockOut: dateNow,
      },
    });
  }

  async editShift(data: { id: string; employee?: string }) {
    const { id, employee } = data;

    return prisma.shift.update({
      where: {
        id,
      },
      data: {
        employee,
      },
    });
  }

  async deleteShift(data: { id: string }) {
    const { id } = data;
    return prisma.shift.delete({
      where: {
        id,
      },
    });
  }

  async clockIn(data: { id: string }) {
    const { id } = data;
    const dateNow = new Date().toISOString();
    return prisma.shift.update({
      where: {
        id,
      },
      data: {
        clockIn: dateNow,
      },
    });
  }

  async clockOut(data: { id: string }) {
    const { id } = data;
    const dateNow = new Date().toISOString();
    return prisma.shift.update({
      where: {
        id,
      },
      data: {
        clockOut: dateNow,
      },
    });
  }
}
