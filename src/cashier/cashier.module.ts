import { Module } from '@nestjs/common';
import { CashierController } from './cashier.controller';
import { CashierService } from './cashier.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { CashierStrategy } from './cashier.strategy';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'cashier-strategy' }),
    JwtModule.register({
      secret: `${process.env.JWT_CASHIER_SECRET}`,
      signOptions: { expiresIn: '16h' },
    }),
  ],
  controllers: [CashierController],
  providers: [CashierService, CashierStrategy, JwtService],
})
export class CashierModule {}
