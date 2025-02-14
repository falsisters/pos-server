import { Body, Controller, Post, Put } from '@nestjs/common';
import { CashierService } from './cashier.service';
import { CreateCashierDto } from './dto/createCashier.dto';
import { LoginAsCashierDto } from './dto/loginAsCashier.dto';
import { EditCashierDto } from './dto/editCashier.dto';

@Controller('cashier')
export class CashierController {
  constructor(private cashierService: CashierService) {}

  @Post('create')
  async createCashier(@Body() createCashierDto: CreateCashierDto) {
    return this.cashierService.createCashier(createCashierDto);
  }

  @Post()
  async loginAsCashier(@Body() loginAsCashier: LoginAsCashierDto) {
    return this.cashierService.validateCashier(loginAsCashier);
  }

  @Put()
  async editCashier(@Body() editCashier: EditCashierDto) {
    return this.cashierService.editCashier(editCashier);
  }
}
