import { BadRequestException, Injectable } from '@nestjs/common';
import { Transfer } from '@prisma/client';
import { FindManyQuery } from 'src/common/interface/http-query.dto';
import { ResponsePagination } from 'src/common/interface/pagination.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { isJsonString } from 'src/util/text.util';
import { TransferCreateDto } from './dto/transfer-create.dto';
import { TransferUpdateDto } from './dto/transfer-update.dto';
import { UserCryptocurrencyService } from 'src/user-cryptocurrency/user-cryptocurrency.service';
@Injectable()
export class TransferService {
  constructor(
    private prisma: PrismaService,
    private userCryptoService: UserCryptocurrencyService,
  ) {
    //
  }

  async findAll(query: FindManyQuery): Promise<ResponsePagination<Transfer>> {
    const page = query.page || 1;
    const pageSize = query.pageSize || 20;
    const where = isJsonString(query.where) || {};
    const totalItem = await this.prisma.transfer.count(where);

    const totalPage = Math.ceil(totalItem / pageSize);

    const data = await this.prisma.transfer.findMany({
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

  async createOne(dto: TransferCreateDto) {
    await this.updateFromUserAmount(dto);
    await this.updateToUserAmount(dto);

    return this.prisma.transfer.create({
      data: dto,
    });
  }

  async updateFromUserAmount(dto: TransferCreateDto) {
    const userCrypto = await this.userCryptoService.findByUserIdAndCryptoId(
      dto.fromUserId,
      dto.cryptoId,
    );

    if (dto.amount > userCrypto.amount) {
      throw new BadRequestException(
        'Can not transfer because amount not enough',
      );
    }

    await this.userCryptoService.updateOne(userCrypto.id, {
      amount: userCrypto.amount - dto.amount,
    });
  }

  async updateToUserAmount(dto: TransferCreateDto) {
    let userCrypto = await this.userCryptoService.findByUserIdAndCryptoId(
      dto.toUserId,
      dto.cryptoId,
    );

    if (!userCrypto) {
      userCrypto = await this.userCryptoService.createOne({
        cryptoId: dto.cryptoId,
        amount: dto.amount,
        userId: dto.toUserId,
      });
    } else {
      await this.userCryptoService.updateOne(userCrypto.id, {
        amount: userCrypto.amount + dto.amount,
      });
    }
  }

  updateOne(id: number, dto: TransferUpdateDto) {
    return this.prisma.transfer.update({
      data: dto,
      where: {
        id,
      },
    });
  }

  deleteOne(id: number) {
    return this.prisma.transfer.delete({
      where: {
        id,
      },
    });
  }

  findById(id: number) {
    return this.prisma.transfer.findUnique({
      where: {
        id,
      },
    });
  }
}
