import { Module } from '@nestjs/common';
import { KahonController } from './kahon.controller';
import { KahonService } from './kahon.service';

@Module({
  controllers: [KahonController],
  providers: [KahonService]
})
export class KahonModule {}
