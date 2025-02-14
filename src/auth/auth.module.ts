import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from 'src/user/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { JwtStrategy } from './jwt/jwt.strategy';

@Module({
  imports: [
    UserModule,
    PassportModule.register({ defaultStrategy: 'jwt-strategy' }),
    JwtModule.register({
      secret: `${process.env.JWT_SECRET}`,
      signOptions: {
        expiresIn: '3h',
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, UserService, JwtStrategy],
})
export class AuthModule {}
