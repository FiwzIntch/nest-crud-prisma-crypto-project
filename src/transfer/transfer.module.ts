import { Module } from '@nestjs/common';
import { TransferController } from './transfer.controller';
import { TransferService } from './transfer.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UserCryptocurrencyModule } from 'src/user-cryptocurrency/user-cryptocurrency.module';

@Module({
  imports: [PrismaModule, UserCryptocurrencyModule],
  controllers: [TransferController],
  providers: [TransferService],
})
export class TransferModule {
  //
}
