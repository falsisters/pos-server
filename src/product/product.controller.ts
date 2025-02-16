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
import { ProductService } from './product.service';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';
import { JwtPayload } from 'src/auth/jwt/jwt.type';
import { CreateProductDto } from './dto/createProduct.dto';
import { EditProductDto } from './dto/editProduct.dto';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

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
  async createProduct(
    @Request() req,
    @Body() createProductDto: CreateProductDto,
  ) {
    const user: JwtPayload = req.user;
    return this.productService.createProduct({
      user,
      product: createProductDto,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async editProduct(@Param('id') id, @Body() editProductDto: EditProductDto) {
    return this.productService.editProduct({
      id,
      product: editProductDto,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteProduct(@Param('id') id) {
    return this.productService.deleteProduct({ id });
  }
}
