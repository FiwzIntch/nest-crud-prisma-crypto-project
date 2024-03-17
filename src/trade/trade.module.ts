import { Module } from '@nestjs/common';
import { TradeController } from './trade.controller';
import { TradeService } from './trade.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { OrderModule } from 'src/order/order.module';
import { PurchaseOrderModule } from 'src/purchase-order/purchase-order.module';
import { TransactionModule } from 'src/transaction/transaction.module';

@Module({
  imports: [PrismaModule, OrderModule, PurchaseOrderModule, TransactionModule],
  controllers: [TradeController],
  providers: [TradeService],
})
export class TradeModule {
  //
}
