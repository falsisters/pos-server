import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class CashierAuthGuard extends AuthGuard('cashier') {
  handleRequest<TUser = any>(err: any, user: any, info: any): TUser {
    // Handle specific JWT errors
    if (info instanceof Error) {
      if (info.name === 'TokenExpiredError') {
        throw new UnauthorizedException('Token has expired');
      }
      if (info.name === 'JsonWebTokenError') {
        throw new UnauthorizedException('Invalid token');
      }
    }

    // Handle other errors or missing user
    if (err || !user) {
      throw err || new UnauthorizedException('Unauthorized');
    }

    return user;
  }
}
