import { Module } from '@nestjs/common';
import { UserCryptocurrencyController } from './user-cryptocurrency.controller';
import { UserCryptocurrencyService } from './user-cryptocurrency.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [UserCryptocurrencyController],
  providers: [UserCryptocurrencyService],
  exports: [UserCryptocurrencyService],
})
export class UserCryptocurrencyModule {
  //
}
