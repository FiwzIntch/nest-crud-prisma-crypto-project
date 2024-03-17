import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CryptocurrencyModule } from './cryptocurrency/cryptocurrency.module';
import { UserModule } from './user/user.module';
import { UserCryptocurrencyModule } from './user-cryptocurrency/user-cryptocurrency.module';
import { OrderModule } from './order/order.module';
import { PurchaseOrderModule } from './purchase-order/purchase-order.module';
import { TransactionModule } from './transaction/transaction.module';
import { TradeModule } from './trade/trade.module';
import { TransferModule } from './transfer/transfer.module';

@Module({
  imports: [
    CryptocurrencyModule,
    UserModule,
    UserCryptocurrencyModule,
    OrderModule,
    PurchaseOrderModule,
    TransactionModule,
    TradeModule,
    TransferModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  //
}
