import { Module } from '@nestjs/common';
import { CashierController } from './cashier.controller';
import { CashierService } from './cashier.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { CashierStrategy } from './cashier.strategy';
import { AuthModule } from 'src/auth/auth.module';
import { AuthService } from 'src/auth/auth.service';

@Module({
  imports: [
    AuthModule,
    PassportModule.register({ defaultStrategy: 'cashier-strategy' }),
    JwtModule.register({
      secret: `${process.env.JWT_CASHIER_SECRET}`,
      signOptions: { expiresIn: '16h' },
    }),
  ],
  controllers: [CashierController],
  providers: [CashierService, CashierStrategy, JwtService, AuthService],
})
export class CashierModule {}
