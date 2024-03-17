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
import { CryptocurrencyService } from './cryptocurrency.service';
import { FindManyQuery } from 'src/common/interface/http-query.dto';
import { CryptocurrencyCreateDto } from './dto/cryptocurrency-create.dto';
import { CryptocurrencyUpdateDto } from './dto/cryptocurrency-update.dto';

@ApiTags('Cryptocurrency')
@Controller('cryptocurrency')
export class CryptocurrencyController {
  constructor(private readonly service: CryptocurrencyService) {
    //
  }

  @Get()
  async findAll(@Query() query: FindManyQuery) {
    return await this.service.findAll(query);
  }

  @Post()
  async create(@Body() dto: CryptocurrencyCreateDto) {
    return await this.service.createOne(dto);
  }

  @Put(':id')
  async update(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() dto: CryptocurrencyUpdateDto,
  ) {
    return await this.service.updateOne(id, dto);
  }

  @Delete(':id')
  async delete(@Param('id', new ParseIntPipe()) id: number) {
    return await this.service.deleteOne(id);
  }
}
