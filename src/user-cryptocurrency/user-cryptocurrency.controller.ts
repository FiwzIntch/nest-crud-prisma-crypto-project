import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { FindManyQuery } from 'src/common/interface/http-query.dto';
import { UserCryptocurrencyService } from './user-cryptocurrency.service';
import { UserCryptocurrencyCreateDto } from './dto/user-cryptocurrency-create.dto';
import { UserCryptocurrencyUpdateDto } from './dto/user-cryptocurrency-update.dto';

@ApiTags('User Cryptocurrency')
@Controller('user-cryptocurrency')
export class UserCryptocurrencyController {
  constructor(private readonly service: UserCryptocurrencyService) {
    //
  }

  @Get()
  async findAll(@Query() query: FindManyQuery) {
    return await this.service.findAll(query);
  }

  @Post()
  async create(@Body() dto: UserCryptocurrencyCreateDto) {
    return await this.service.createOne(dto);
  }

  @Put(':id')
  async update(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() dto: UserCryptocurrencyUpdateDto,
  ) {
    return await this.service.updateOne(id, dto);
  }

  @Delete(':id')
  async delete(@Param('id', new ParseIntPipe()) id: number) {
    return await this.service.deleteOne(id);
  }
}
