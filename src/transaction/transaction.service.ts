import { BadRequestException, Injectable } from '@nestjs/common';
import { Transaction } from '@prisma/client';
import { FindManyQuery } from 'src/common/interface/http-query.dto';
import { ResponsePagination } from 'src/common/interface/pagination.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { isJsonString } from 'src/util/text.util';
import { TransactionCreateDto } from './dto/transaction-create.dto';
import { UserCryptocurrencyService } from 'src/user-cryptocurrency/user-cryptocurrency.service';
import { OrderService } from 'src/order/order.service';
import { PurchaseOrderService } from 'src/purchase-order/purchase-order.service';

@Injectable()
export class TransactionService {
  constructor(
    private prisma: PrismaService,
    private orderService: OrderService,
    private purchaseOrderService: PurchaseOrderService,
    private userCryptoService: UserCryptocurrencyService,
  ) {
    //
  }

  async findAll(
    query: FindManyQuery,
  ): Promise<ResponsePagination<Transaction>> {
    const page = query.page || 1;
    const pageSize = query.pageSize || 20;
    const where = isJsonString(query.where) || {};
    const totalItem = await this.prisma.transaction.count(where);

    const totalPage = Math.ceil(totalItem / pageSize);

    const data = await this.prisma.transaction.findMany({
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

  async createOne(dto: TransactionCreateDto) {
    const response = await this.prisma.transaction.create({
      data: dto,
    });

    if (response) {
      await this.updateAmountSeller(dto);

      await this.updateAmountBuyer(dto);
    }

    return response;
  }

  async updateAmountSeller(dto: TransactionCreateDto) {
    const sellerDetail = await this.orderService.findUserDetailById(
      dto.orderId,
    );

    const userCrypto = sellerDetail.user.userCryptocurrencys.filter(
      (ucc) => ucc.cryptoId === dto.cryptoId,
    );

    if (userCrypto.length === 0) {
      throw new BadRequestException('Not found crypto in this order user');
    }

    if (userCrypto.length > 0 && userCrypto[0].amount < dto.amount) {
      throw new BadRequestException(
        'Can not trade because amount in order not enough',
      );
    }

    const amount = userCrypto[0].amount - dto.amount;

    await this.userCryptoService.updateOne(userCrypto[0].id, {
      amount,
    });
  }

  async updateAmountBuyer(dto: TransactionCreateDto) {
    const buyerDetail = await this.purchaseOrderService.findUserDetailById(
      dto.purchaseId,
    );

    const userCrypto = buyerDetail.user.userCryptocurrencys.filter(
      (ucc) => ucc.cryptoId === dto.cryptoId,
    );

    console.log(userCrypto);

    if (userCrypto.length === 0) {
      await this.userCryptoService.createOne({
        userId: buyerDetail.userId,
        cryptoId: dto.cryptoId,
        amount: dto.amount,
      });
    } else {
      const amount = userCrypto[0].amount + dto.amount;

      await this.userCryptoService.updateOne(userCrypto[0].id, {
        amount,
      });
    }
  }

  deleteOne(id: number) {
    return this.prisma.transaction.delete({
      where: {
        id,
      },
    });
  }
}
