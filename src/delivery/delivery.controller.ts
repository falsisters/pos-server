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
import { DeliveryService } from './delivery.service';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';
import { CreateDeliveryDto, EditDeliveryDto } from './dto/delivery.dto';
import { CashierAuthGuard } from 'src/cashier/cashier.guard';

@Controller('delivery')
export class DeliveryController {
  constructor(private readonly deliveryService: DeliveryService) {}

  @UseGuards(CashierAuthGuard)
  @Post('create')
  async createDelivery(
    @Request() req,
    @Body() createDeliveryDto: CreateDeliveryDto,
  ) {
    const user = req.user;
    return this.deliveryService.createDelivery({
      id: user.id,
      delivery: createDeliveryDto,
    });
  }

  @UseGuards(CashierAuthGuard)
  @Put(':id')
  async editDelivery(
    @Param('id') id: string,
    @Body() editDeliveryDto: EditDeliveryDto,
  ) {
    return this.deliveryService.editDelivery({
      id,
      delivery: editDeliveryDto,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteDelivery(@Param('id') id: string) {
    return this.deliveryService.deleteDelivery({ id });
  }

  @UseGuards(CashierAuthGuard)
  @Get('cashier')
  async getAllDeliveriesByCashierId(@Request() req: any) {
    const user = req.user;
    return this.deliveryService.getAllDeliveriesByCashierId({
      cashierId: user.id,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Get('user')
  async getAllDeliveriesByUserId(@Request() req: any) {
    const user = req.user;
    return this.deliveryService.getAllDeliveriesByUserId({ userId: user.id });
  }

  @Get(':id')
  async getDeliveryById(@Param('id') id: string) {
    return this.deliveryService.getDeliveryById({ id });
  }
}
