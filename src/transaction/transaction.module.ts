import { Module } from '@nestjs/common';
import { TransactionController } from './transaction.controller';
import { TransactionService } from './transaction.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UserCryptocurrencyModule } from 'src/user-cryptocurrency/user-cryptocurrency.module';
import { OrderModule } from 'src/order/order.module';
import { PurchaseOrderModule } from 'src/purchase-order/purchase-order.module';

@Module({
  imports: [
    PrismaModule,
    UserCryptocurrencyModule,
    OrderModule,
    PurchaseOrderModule,
  ],
  controllers: [TransactionController],
  providers: [TransactionService],
  exports: [TransactionService],
})
export class TransactionModule {
  //
}
