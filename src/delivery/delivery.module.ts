import { Module } from '@nestjs/common';
import { DeliveryController } from './delivery.controller';
import { DeliveryService } from './delivery.service';
import { AuthService } from 'src/auth/auth.service';
import { CashierService } from 'src/cashier/cashier.service';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { AuthModule } from 'src/auth/auth.module';
import { CashierModule } from 'src/cashier/cashier.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [AuthModule, CashierModule, UserModule],
  controllers: [DeliveryController],
  providers: [
    DeliveryService,
    AuthService,
    CashierService,
    UserService,
    JwtService,
  ],
})
export class DeliveryModule {}
