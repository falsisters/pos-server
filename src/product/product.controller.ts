import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Request,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';
import { JwtPayload } from 'src/auth/jwt/jwt.type';
import { CreateProductDto } from './dto/createProduct.dto';
import { EditProductDto } from './dto/editProduct.dto';
import { CashierAuthGuard } from 'src/cashier/cashier.guard';
import { CashierJwtPayload } from 'src/cashier/cashier.type';
import {
  PermissionGuard,
  RequirePermission,
} from '../permission/permission.guard';
import { FilesInterceptor } from '@nestjs/platform-express';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @UseGuards(CashierAuthGuard)
  @Get('cashier')
  async getAllProductsByUserIdForCashier(@Request() req) {
    const user: CashierJwtPayload = req.user;
    return this.productService.getAllProductsByCashierId({
      cashierId: user.id,
    });
  }

  @UseGuards(CashierAuthGuard, PermissionGuard)
  @RequirePermission('STOCKS')
  @Put('cashier/:id')
  async editCashierProduct(
    @Param('id') id,
    @Body() editProductDto: EditProductDto,
  ) {
    return this.productService.editProduct({
      id,
      product: editProductDto,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getProductById(@Param('id') id: string) {
    return this.productService.getProductById({ id });
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAllProductsByUserId(@Request() req) {
    const user: JwtPayload = req.user;
    return this.productService.getAllProductsByUserId({ userId: user.id });
  }

  @UseGuards(JwtAuthGuard)
  @Post('create')
  @UseInterceptors(FilesInterceptor('picture'))
  async createProduct(
    @Request() req,
    @Body() createProductDto: CreateProductDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const createProductDtoWithUpload = {
      ...createProductDto,
      picture: {
        fileName: file.originalname,
        path: 'products',
        file,
      },
    };

    const user: JwtPayload = req.user;
    return this.productService.createProduct({
      user,
      product: createProductDtoWithUpload,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  @UseInterceptors(FilesInterceptor('picture'))
  async editProduct(
    @Param('id') id,
    @Body() editProductDto: EditProductDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const editProductDtoWithUpload = {
      ...editProductDto,
      picture: {
        fileName: file.originalname,
        path: 'products/',
        file,
      },
    };
    return this.productService.editProduct({
      id,
      product: editProductDtoWithUpload,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteProduct(@Param('id') id) {
    return this.productService.deleteProduct({ id });
  }
}
