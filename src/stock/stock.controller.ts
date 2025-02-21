import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Request,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { StockService } from './stock.service';
import { CashierAuthGuard } from 'src/cashier/cashier.guard';
import {
  PermissionGuard,
  RequirePermission,
} from '../permission/permission.guard';
import { EditStockDto } from './dto/editStock.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { TransferStockDto } from './dto/transferStock.dto';

@Controller('stock')
export class StockController {
  constructor(private stockService: StockService) {}

  @UseGuards(CashierAuthGuard, PermissionGuard)
  @RequirePermission('STOCKS')
  @Post('transfer')
  @UseInterceptors(FilesInterceptor('attachments'))
  async transferStock(
    @Body() transferStockDto: TransferStockDto,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    const newTransferStockDto: TransferStockDto = {
      ...transferStockDto,
      attachments: files.map((file) => ({
        fileName: file.originalname,
        path: 'transfers/',
        file: file,
      })),
    };

    return this.stockService.transferStock({
      product: newTransferStockDto,
    });
  }

  @UseGuards(CashierAuthGuard, PermissionGuard)
  @Get()
  @RequirePermission('STOCKS')
  async getAllStocks(@Request() req: any) {
    const user = req.user;
    return this.stockService.getAllStocks({ id: user.userId });
  }

  @Get('transfer/:id')
  async getTransferById(@Param('id') id: string) {
    return this.stockService.getTransferById({ id });
  }

  @UseGuards(CashierAuthGuard, PermissionGuard)
  @RequirePermission('STOCKS')
  @Get('transfer')
  async getAllTransfersByUserId(@Request() req: any) {
    const user = req.user;
    return this.stockService.getAllTransfersByUserId({ id: user.userId });
  }

  @Get(':id')
  async getStockById(@Param('id') id: string) {
    return this.stockService.getStockById({ id });
  }

  @UseGuards(CashierAuthGuard, PermissionGuard)
  @RequirePermission('STOCKS')
  @Put(':id')
  async editStock(@Param('id') id: string, @Body() editStockDto: EditStockDto) {
    return this.stockService.editStock({
      id,
      product: editStockDto,
    });
  }
}
