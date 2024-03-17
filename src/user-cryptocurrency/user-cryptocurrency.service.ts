import { Injectable } from '@nestjs/common';
import { UserCryptocurrencyUpdateDto } from './dto/user-cryptocurrency-update.dto';
import { UserCryptocurrencyCreateDto } from './dto/user-cryptocurrency-create.dto';
import { FindManyQuery } from 'src/common/interface/http-query.dto';
import { UserCryptocurrency } from '@prisma/client';
import { isJsonString } from 'src/util/text.util';
import { PrismaService } from 'src/prisma/prisma.service';
import { ResponsePagination } from 'src/common/interface/pagination.dto';

@Injectable()
export class UserCryptocurrencyService {
  constructor(private prisma: PrismaService) {
    //
  }

  async findAll(
    query: FindManyQuery,
  ): Promise<ResponsePagination<UserCryptocurrency>> {
    const page = query.page || 1;
    const pageSize = query.pageSize || 20;
    const where = isJsonString(query.where) || {};
    const totalItem = await this.prisma.userCryptocurrency.count(where);

    const totalPage = Math.ceil(totalItem / pageSize);

    const data = await this.prisma.userCryptocurrency.findMany({
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

  createOne(dto: UserCryptocurrencyCreateDto) {
    return this.prisma.userCryptocurrency.create({
      data: dto,
    });
  }

  updateOne(id: number, dto: UserCryptocurrencyUpdateDto) {
    return this.prisma.userCryptocurrency.update({
      data: dto,
      where: {
        id,
      },
    });
  }

  deleteOne(id: number) {
    return this.prisma.userCryptocurrency.delete({
      where: {
        id,
      },
    });
  }

  findByUserIdAndCryptoId(userId: number, cryptoId: number) {
    return this.prisma.userCryptocurrency.findFirst({
      where: {
        userId,
        cryptoId,
      },
    });
  }
}
