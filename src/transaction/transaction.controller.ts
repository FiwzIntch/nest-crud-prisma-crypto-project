import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { FindManyQuery } from 'src/common/interface/http-query.dto';
import { TransactionService } from './transaction.service';

@ApiTags('Transaction')
@Controller('transaction')
export class TransactionController {
  constructor(private readonly service: TransactionService) {
    //
  }

  @Get()
  async findAll(@Query() query: FindManyQuery) {
    return await this.service.findAll(query);
  }

  // @Post()
  // async create(@Body() dto: TransactionCreateDto) {
  //   return await this.service.createOne(dto);
  // }

  // @Delete(':id')
  // async delete(@Param('id', new ParseIntPipe()) id: number) {
  //   return await this.service.deleteOne(id);
  // }
}
