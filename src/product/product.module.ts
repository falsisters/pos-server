import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { PassportModule } from '@nestjs/passport';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { UploadService } from 'src/upload/upload.service';
import { UploadModule } from 'src/upload/upload.module';

@Module({
  imports: [PassportModule.register({ defaultStrategy: 'jwt' }), UploadModule],
  controllers: [ProductController],
  providers: [ProductService, UserService, JwtService, UploadService],
})
export class ProductModule {}
