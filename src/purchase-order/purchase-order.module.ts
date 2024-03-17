import { Module } from '@nestjs/common';
import { PurchaseOrderController } from './purchase-order.controller';
import { PurchaseOrderService } from './purchase-order.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { CryptocurrencyModule } from 'src/cryptocurrency/cryptocurrency.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [PrismaModule, CryptocurrencyModule, UserModule],
  controllers: [PurchaseOrderController],
  providers: [PurchaseOrderService],
  exports: [PurchaseOrderService],
})
export class PurchaseOrderModule {
  //
}
