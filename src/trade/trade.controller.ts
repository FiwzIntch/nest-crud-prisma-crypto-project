import { Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TradeService } from './trade.service';

@ApiTags('Trade')
@Controller('trade')
export class TradeController {
  constructor(private readonly service: TradeService) {
    //
  }
  @Post()
  async trade() {
    return await this.service.trade();
  }
}
