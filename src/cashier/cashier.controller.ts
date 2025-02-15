import {
  Body,
  Controller,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CashierService } from './cashier.service';
import { CreateCashierDto } from './dto/createCashier.dto';
import { LoginAsCashierDto } from './dto/loginAsCashier.dto';
import { EditCashierDto } from './dto/editCashier.dto';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';
import { JwtPayload } from 'src/auth/jwt/jwt.type';

@Controller('cashier')
export class CashierController {
  constructor(private cashierService: CashierService) {}

  @UseGuards(JwtAuthGuard)
  @Post('create')
  async createCashier(
    @Request() req: any,
    @Body() createCashierDto: CreateCashierDto,
  ) {
    const user: JwtPayload = req.user;
    return this.cashierService.createCashier({
      name: createCashierDto.name,
      accessKey: createCashierDto.accessKey,
      userId: user.id,
    });
  }

  @Post()
  async loginAsCashier(@Body() loginAsCashier: LoginAsCashierDto) {
    return this.cashierService.validateCashier(loginAsCashier);
  }

  @UseGuards(JwtAuthGuard)
  @Put()
  async editCashier(@Body() editCashier: EditCashierDto) {
    return this.cashierService.editCashier(editCashier);
  }
}
