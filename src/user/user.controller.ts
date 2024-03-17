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
import { UserService } from './user.service';
import { FindManyQuery } from 'src/common/interface/http-query.dto';
import { UserCreateDto } from './dto/user-create.dto';
import { UserUpdateDto } from './dto/user-update.dto';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly service: UserService) {
    //
  }

  @Get()
  async findAll(@Query() query: FindManyQuery) {
    return await this.service.findAll(query);
  }

  @Post()
  async create(@Body() dto: UserCreateDto) {
    return await this.service.createOne(dto);
  }

  @Put(':id')
  async update(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() dto: UserUpdateDto,
  ) {
    return await this.service.updateOne(id, dto);
  }

  @Delete(':id')
  async delete(@Param('id', new ParseIntPipe()) id: number) {
    return await this.service.deleteOne(id);
  }
}
