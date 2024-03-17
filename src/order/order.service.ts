import { Injectable } from '@nestjs/common';
import { Order, Status } from '@prisma/client';
import { FindManyQuery } from 'src/common/interface/http-query.dto';
import { ResponsePagination } from 'src/common/interface/pagination.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { isJsonString } from 'src/util/text.util';
import { OrderCreateDto } from './dto/order-create.dto';
import { OrderCreate } from './interface/order.model.interface';
import { CryptocurrencyService } from 'src/cryptocurrency/cryptocurrency.service';

@Injectable()
export class OrderService {
  constructor(
    private prisma: PrismaService,
    private cryptoService: CryptocurrencyService,
  ) {
    //
  }

  async findAll(query: FindManyQuery): Promise<ResponsePagination<Order>> {
    const page = query.page || 1;
    const pageSize = query.pageSize || 20;
    const where = isJsonString(query.where) || {};
    const totalItem = await this.prisma.order.count(where);

    const totalPage = Math.ceil(totalItem / pageSize);

    const data = await this.prisma.order.findMany({
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

  async createOne(dto: OrderCreateDto) {
    const crypto = await this.cryptoService.findById(dto.cryptoId);

    const data: OrderCreate = {
      cryptoId: dto.cryptoId,
      userId: dto.userId,
      status: dto.status,
      unitPrice: crypto.price,
      amount: dto.amount,
    };

    return this.prisma.order.create({
      data,
    });
  }

  updateStatus(id: number, status: Status) {
    return this.prisma.order.update({
      data: {
        status,
      },
      where: {
        id,
      },
    });
  }

  deleteOne(id: number) {
    return this.prisma.order.delete({
      where: {
        id,
      },
    });
  }

  findUserDetailById(id: number) {
    return this.prisma.order.findUnique({
      where: {
        id,
      },
      include: {
        user: {
          include: {
            userCryptocurrencys: true,
          },
        },
      },
    });
  }
}
