import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { FindManyQuery } from 'src/common/interface/http-query.dto';
import { OrderCreateDto } from './dto/order-create.dto';
import { OrderService } from './order.service';

@ApiTags('Order')
@Controller('order')
export class OrderController {
  constructor(private readonly service: OrderService) {
    //
  }

  @Get()
  async findAll(@Query() query: FindManyQuery) {
    return await this.service.findAll(query);
  }

  @Post()
  async create(@Body() dto: OrderCreateDto) {
    return await this.service.createOne(dto);
  }

  // @Put(':id/:status')
  // async updateStatus(
  //   @Param('id', new ParseIntPipe()) id: number,
  //   @Param('status') status: string,
  // ) {
  //   if (!Object.values(Status).includes(status as Status)) {
  //     throw new BadRequestException('invalid status');
  //   }

  //   const updateStatus = status as Status;

  //   return await this.service.updateStatus(id, updateStatus);
  // }

  // @Delete(':id')
  // async delete(@Param('id', new ParseIntPipe()) id: number) {
  //   return await this.service.deleteOne(id);
  // }
}
