import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { KahonService } from './kahon.service';
import { CashierAuthGuard } from 'src/cashier/cashier.guard';
import {
  PermissionGuard,
  RequirePermission,
} from '../permission/permission.guard';
import {
  TransferFromDelivery,
  TransferFromProducts,
} from './dto/transferFromProducts.dto';
import { CreateKahonDto } from './dto/createKahon.dto';
import { UpdateKahonDto } from './dto/updateKahon.dto';

@Controller('kahon')
export class KahonController {
  constructor(private kahonService: KahonService) {}

  @UseGuards(CashierAuthGuard, PermissionGuard)
  @RequirePermission('KAHON')
  @Post('transfer/product')
  async transferFromProducts(
    @Request() req,
    @Body() transferFromProducts: TransferFromProducts,
  ) {
    const user = req.user;
    return this.kahonService.transferStockToKahonFromProducts({
      id: user.id,
      product: transferFromProducts,
    });
  }

  @UseGuards(CashierAuthGuard, PermissionGuard)
  @RequirePermission('KAHON')
  @Post('transfer/delivery/:id')
  async transferFromDelivery(
    @Param('id') id: string,
    @Request() req,
    @Body() transferFromDelivery: TransferFromDelivery,
  ) {
    return this.kahonService.transferStockToKahonFromDelivery({
      id,
      delivery: transferFromDelivery,
    });
  }

  @UseGuards(CashierAuthGuard, PermissionGuard)
  @RequirePermission('KAHON')
  @Post('create')
  async createKahon(@Request() req, @Body() body: CreateKahonDto) {
    const user = req.user;
    return this.kahonService.createKahon({
      id: user.id,
      createKahonDto: body,
    });
  }

  @UseGuards(CashierAuthGuard, PermissionGuard)
  @RequirePermission('KAHON')
  @Get('all')
  async getAllKahon(@Request() req) {
    const user = req.user;
    return this.kahonService.getAllKahonByCashierId({ id: user.id });
  }

  @UseGuards(CashierAuthGuard, PermissionGuard)
  @RequirePermission('KAHON')
  @Put(':id')
  async updateKahon(@Param('id') id: string, @Body() body: UpdateKahonDto) {
    return this.kahonService.updateKahon({ id, updateKahonDto: body });
  }

  @UseGuards(CashierAuthGuard, PermissionGuard)
  @RequirePermission('KAHON')
  @Get(':id')
  async getKahonById(@Param('id') id: string) {
    return this.kahonService.getKahonById({ id });
  }
}
