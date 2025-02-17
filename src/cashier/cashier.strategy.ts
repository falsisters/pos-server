import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { CashierJwtPayload } from './cashier.type';

@Injectable()
export class CashierStrategy extends PassportStrategy(Strategy, 'cashier') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: `${process.env.JWT_CASHIER_SECRET}`,
    });
  }

  async validate(payload: CashierJwtPayload) {
    return {
      id: payload.id,
      name: payload.name,
      userId: payload.userId,
      permissions: payload.permissions,
    };
  }
}
