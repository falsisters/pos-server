import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';
import { SaleService } from './sale.service';
import { CashierAuthGuard } from 'src/cashier/cashier.guard';
import { CreateSaleDto } from './dto/createSale.dto';
import { EditSaleDto } from './dto/editSale.dto';

@Controller('sale')
export class SaleController {
  constructor(private saleService: SaleService) {}

  @UseGuards(JwtAuthGuard)
  @Get('user')
  async getAllSalesByUserId(@Request() req: any) {
    const user = req.user;
    return this.saleService.getAllSalesByUserId({ id: user.id });
  }

  @UseGuards(CashierAuthGuard)
  @Get()
  async getAllSalesByCashierId(@Request() req: any) {
    const user = req.user;
    return this.getAllSalesByCashierId({ id: user.id });
  }

  @UseGuards(CashierAuthGuard)
  @Post('create')
  async createSale(@Request() req: any, @Body() createSaleDto: CreateSaleDto) {
    const user = req.user;
    return this.saleService.createSale({ id: user.id, sale: createSaleDto });
  }

  @UseGuards(CashierAuthGuard)
  @Put(':id')
  async editSale(@Param('id') id: string, @Body() editSaleDto: EditSaleDto) {
    return this.saleService.editSale({ id, sale: editSaleDto });
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteSale(@Param('id') id: string) {
    return this.saleService.deleteSale({ id });
  }

  @UseGuards(CashierAuthGuard)
  @Delete('cashier/:id')
  async deleteSaleAsCashier(@Param('id') id: string) {
    return this.saleService.deleteSale({ id });
  }
}
