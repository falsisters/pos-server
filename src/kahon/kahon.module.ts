import { Module } from '@nestjs/common';
import { KahonController } from './kahon.controller';
import { KahonService } from './kahon.service';
import { CashierModule } from 'src/cashier/cashier.module';
import { AuthModule } from 'src/auth/auth.module';
import { UserModule } from 'src/user/user.module';
import { AuthService } from 'src/auth/auth.service';
import { CashierService } from 'src/cashier/cashier.service';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [CashierModule, AuthModule, UserModule],
  controllers: [KahonController],
  providers: [
    KahonService,
    AuthService,
    CashierService,
    UserService,
    JwtService,
  ],
})
export class KahonModule {}
