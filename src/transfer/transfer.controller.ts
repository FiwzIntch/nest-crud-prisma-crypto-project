import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { FindManyQuery } from 'src/common/interface/http-query.dto';
import { TransferCreateDto } from './dto/transfer-create.dto';
import { TransferService } from './transfer.service';

@ApiTags('Transfer')
@Controller('transfer')
export class TransferController {
  constructor(private readonly service: TransferService) {
    //
  }

  @Get()
  async findAll(@Query() query: FindManyQuery) {
    return await this.service.findAll(query);
  }

  @Post()
  async create(@Body() dto: TransferCreateDto) {
    return await this.service.createOne(dto);
  }

  // @Put(':id')
  // async update(
  //   @Param('id', new ParseIntPipe()) id: number,
  //   @Body() dto: TransferUpdateDto,
  // ) {
  //   return await this.service.updateOne(id, dto);
  // }

  // @Delete(':id')
  // async delete(@Param('id', new ParseIntPipe()) id: number) {
  //   return await this.service.deleteOne(id);
  // }
}
