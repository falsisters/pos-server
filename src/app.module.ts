import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { CashierModule } from './cashier/cashier.module';
import { ShiftModule } from './shift/shift.module';
import { ProductModule } from './product/product.module';
import { SaleModule } from './sale/sale.module';
import { DeliveryModule } from './delivery/delivery.module';
import { KahonModule } from './kahon/kahon.module';
import { TransferModule } from './transfer/transfer.module';
import { BreakdownModule } from './breakdown/breakdown.module';
import { ExpenseModule } from './expense/expense.module';

@Module({
  imports: [UserModule, CashierModule, ShiftModule, ProductModule, SaleModule, DeliveryModule, KahonModule, TransferModule, BreakdownModule, ExpenseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
