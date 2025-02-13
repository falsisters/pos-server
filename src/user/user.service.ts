import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { prisma } from 'src/prisma';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  async findUser(data: { email: string }): Promise<User> {
    return prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });
  }

  async createUser(data: {
    email: string;
    name: string;
    password: string;
  }): Promise<User> {
    const encryptedPassword = await this.encryptPassword(data.password);

    return prisma.user.create({
      data: {
        email: data.email,
        name: data.name,
        password: encryptedPassword,
      },
    });
  }

  private async encryptPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
  }
}
