import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { User } from '@prisma/client';
import { prisma } from 'src/prisma';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(data: { email: string; password: string }) {
    const { email, password } = data;

    const user = await this.userService.findUser({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      return this.login(user);
    }
  }

  async register(data: { email: string; name: string; password }) {
    const user = await this.userService.createUser(data);

    return this.login(user);
  }

  async getUserData(data: { access_token: string }) {
    const decryptedToken: { email: string; id: string; name: string } =
      await this.jwtService.decode(data.access_token);

    return prisma.user.findUnique({
      where: { id: decryptedToken.id },
    });
  }

  private async login(user: User) {
    const payload = { email: user.email, id: user.id, name: user.id };
    return {
      access_token: this.jwtService.sign(payload),
      name: user.name,
    };
  }
}
