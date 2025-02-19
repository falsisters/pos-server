import { Module } from '@nestjs/common';
import { StockController } from './stock.controller';
import { StockService } from './stock.service';
import { CashierModule } from 'src/cashier/cashier.module';
import { AuthModule } from 'src/auth/auth.module';
import { UserModule } from 'src/user/user.module';
import { AuthService } from 'src/auth/auth.service';
import { CashierService } from 'src/cashier/cashier.service';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [CashierModule, AuthModule, UserModule],
  controllers: [StockController],
  providers: [
    StockService,
    AuthService,
    CashierService,
    UserService,
    JwtService,
  ],
})
export class StockModule {}
