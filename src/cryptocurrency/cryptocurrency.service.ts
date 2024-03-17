import { Injectable } from '@nestjs/common';
import { Cryptocurrency } from '@prisma/client';
import { FindManyQuery } from 'src/common/interface/http-query.dto';
import { ResponsePagination } from 'src/common/interface/pagination.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { CryptocurrencyCreateDto } from './dto/cryptocurrency-create.dto';
import { isJsonString } from 'src/util/text.util';
import { CryptocurrencyUpdateDto } from './dto/cryptocurrency-update.dto';

@Injectable()
export class CryptocurrencyService {
  constructor(private prisma: PrismaService) {
    //
  }

  async findAll(
    query: FindManyQuery,
  ): Promise<ResponsePagination<Cryptocurrency>> {
    const page = query.page || 1;
    const pageSize = query.pageSize || 20;
    const where = isJsonString(query.where) || {};
    const totalItem = await this.prisma.cryptocurrency.count(where);

    const totalPage = Math.ceil(totalItem / pageSize);

    const data = await this.prisma.cryptocurrency.findMany({
      where,
      take: pageSize,
      skip: (page - 1) * pageSize,
    });

    return {
      data,
      pagination: {
        page,
        pageSize,
        totalPage,
        totalItem,
      },
    };
  }

  createOne(dto: CryptocurrencyCreateDto) {
    return this.prisma.cryptocurrency.create({
      data: dto,
    });
  }

  updateOne(id: number, dto: CryptocurrencyUpdateDto) {
    return this.prisma.cryptocurrency.update({
      data: dto,
      where: {
        id,
      },
    });
  }

  deleteOne(id: number) {
    return this.prisma.cryptocurrency.delete({
      where: {
        id,
      },
    });
  }

  findById(id: number) {
    return this.prisma.cryptocurrency.findUnique({
      where: {
        id,
      },
    });
  }
}
