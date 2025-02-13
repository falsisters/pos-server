import { Injectable } from '@nestjs/common';
import { prisma } from 'src/prisma';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  async findUser(data: { email: string }) {
    return prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });
  }

  async createUser(data: { email: string; name: string; password: string }) {
    const encryptedPassword = await this.encryptPassword(data.password);

    return prisma.user.create({
      data: {
        email: data.email,
        name: data.name,
        password: encryptedPassword,
      },
    });
  }

  private async encryptPassword(password: string) {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
  }
}
