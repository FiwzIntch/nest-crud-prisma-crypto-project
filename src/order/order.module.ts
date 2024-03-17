import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { CryptocurrencyModule } from 'src/cryptocurrency/cryptocurrency.module';

@Module({
  imports: [PrismaModule, CryptocurrencyModule],
  controllers: [OrderController],
  providers: [OrderService],
  exports: [OrderService],
})
export class OrderModule {
  //
}
