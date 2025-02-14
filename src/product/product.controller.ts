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

  @Get(':id')
  async getAllProductsById(@Param('id') id: string) {
    return this.productService.getProductById({ id });
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getProductByUserId(@Request() req) {
    const user: JwtPayload = req.user;
    return this.getAllProductsById(user.id);
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
      product: createProductDto.product,
      price: createProductDto.price,
      profit: createProductDto.profit,
    });
  }

  @Put(':id')
  async editProduct(@Param('id') id, @Body() editProductDto: EditProductDto) {
    return this.productService.editProduct({
      id,
      product: editProductDto.product,
      price: editProductDto.price,
      profit: editProductDto.profit,
    });
  }

  @Delete(':id')
  async deleteProduct(@Param('id') id) {
    return this.productService.deleteProduct({ id });
  }
}
