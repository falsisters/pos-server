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
import { CashierService } from './cashier.service';
import { CreateCashierDto } from './dto/createCashier.dto';
import { LoginAsCashierDto } from './dto/loginAsCashier.dto';
import { EditCashierDto } from './dto/editCashier.dto';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';
import { JwtPayload } from 'src/auth/jwt/jwt.type';
import { DeleteCashierDto } from './dto/deleteCashier.dto';
import { CashierAuthGuard } from './cashier.guard';

@Controller('cashier')
export class CashierController {
  constructor(private cashierService: CashierService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAlLCashiers(@Request() req: any) {
    const user: JwtPayload = req.user;
    return this.cashierService.getAllCashiers({ userId: user.id });
  }

  @UseGuards(CashierAuthGuard)
  @Get('info')
  async getCashierInfo(@Request() req: any) {
    const cashier = req.user;
    return cashier;
  }

  @Get(':id')
  async getCashierById(@Param('id') id: string) {
    return this.cashierService.getCashierById({ id });
  }

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
      permission: createCashierDto.permissions,
      userId: user.id,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Delete()
  async deleteCashier(@Body() deleteCashierDto: DeleteCashierDto) {
    return this.cashierService.deleteCashier(deleteCashierDto);
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
