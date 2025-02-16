import { Module } from '@nestjs/common';
import { CashierController } from './cashier.controller';
import { CashierService } from './cashier.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { CashierStrategy } from './cashier.strategy';
import { AuthModule } from 'src/auth/auth.module';
import { AuthService } from 'src/auth/auth.service';
import { UserService } from 'src/user/user.service';

@Module({
  imports: [
    AuthModule,
    PassportModule.register({ defaultStrategy: 'cashier' }),
    JwtModule.register({
      secret: `${process.env.JWT_CASHIER_SECRET}`,
      signOptions: { expiresIn: '16h' },
    }),
  ],
  controllers: [CashierController],
  providers: [CashierService, CashierStrategy, AuthService, UserService],
})
export class CashierModule {}
