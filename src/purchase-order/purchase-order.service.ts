import { Injectable } from '@nestjs/common';
import { PurchaseOrder, Status } from '@prisma/client';
import { FindManyQuery } from 'src/common/interface/http-query.dto';
import { ResponsePagination } from 'src/common/interface/pagination.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { isJsonString } from 'src/util/text.util';
import { PurchaseOrderCreateDto } from './dto/purchase-order-create.dto';
import { PurchaseOrderCreate } from './interface/purchase-order.model.interface';
import { CryptocurrencyService } from 'src/cryptocurrency/cryptocurrency.service';
import { UserService } from 'src/user/user.service';
@Injectable()
export class PurchaseOrderService {
  constructor(
    private prisma: PrismaService,
    private cryptoService: CryptocurrencyService,
    private userService: UserService,
  ) {
    //
  }

  async findAll(
    query: FindManyQuery,
  ): Promise<ResponsePagination<PurchaseOrder>> {
    const page = query.page || 1;
    const pageSize = query.pageSize || 20;
    const where = isJsonString(query.where) || {};
    const totalItem = await this.prisma.purchaseOrder.count(where);

    const totalPage = Math.ceil(totalItem / pageSize);

    const data = await this.prisma.purchaseOrder.findMany({
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

  async createOne(dto: PurchaseOrderCreateDto) {
    const crypto = await this.cryptoService.findById(dto.cryptoId);
    const user = await this.userService.findById(dto.userId);

    const paidAmount =
      user.fiatCurrency.name !== 'THB'
        ? dto.paidAmount * user.fiatCurrency.price
        : dto.paidAmount;

    const data: PurchaseOrderCreate = {
      cryptoId: dto.cryptoId,
      userId: dto.userId,
      status: dto.status,
      unitPrice: crypto.price,
      amount: paidAmount / crypto.price,
    };

    return this.prisma.purchaseOrder.create({
      data,
    });
  }

  updateStatus(id: number, status: Status) {
    return this.prisma.purchaseOrder.update({
      data: {
        status,
      },
      where: {
        id,
      },
    });
  }

  deleteOne(id: number) {
    return this.prisma.purchaseOrder.delete({
      where: {
        id,
      },
    });
  }

  findByCryptoId(cryptoId: number, userId: number) {
    return this.prisma.purchaseOrder.findFirst({
      where: {
        cryptoId,
        status: Status.PENDING,
        userId: {
          not: userId,
        },
      },
    });
  }

  findUserDetailById(id: number) {
    return this.prisma.purchaseOrder.findUnique({
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
