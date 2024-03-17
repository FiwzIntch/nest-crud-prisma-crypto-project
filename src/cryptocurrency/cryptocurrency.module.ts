import { Module } from '@nestjs/common';
import { CryptocurrencyController } from './cryptocurrency.controller';
import { CryptocurrencyService } from './cryptocurrency.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [CryptocurrencyController],
  providers: [CryptocurrencyService],
  exports: [CryptocurrencyService],
})
export class CryptocurrencyModule {
  //
}
