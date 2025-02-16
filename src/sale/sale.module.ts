import { Module } from '@nestjs/common';
import { SaleController } from './sale.controller';
import { SaleService } from './sale.service';
import { CashierModule } from 'src/cashier/cashier.module';
import { AuthModule } from 'src/auth/auth.module';
import { AuthService } from 'src/auth/auth.service';
import { CashierService } from 'src/cashier/cashier.service';
import { UserService } from 'src/user/user.service';
import { UserModule } from 'src/user/user.module';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [CashierModule, AuthModule, UserModule],
  controllers: [SaleController],
  providers: [
    SaleService,
    AuthService,
    CashierService,
    UserService,
    JwtService,
  ],
})
export class SaleModule {}
