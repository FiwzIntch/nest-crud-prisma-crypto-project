import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { FindManyQuery } from 'src/common/interface/http-query.dto';
import { ResponsePagination } from 'src/common/interface/pagination.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { isJsonString } from 'src/util/text.util';
import { UserUpdateDto } from './dto/user-update.dto';
import { UserCreateDto } from './dto/user-create.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {
    //
  }

  async findAll(query: FindManyQuery): Promise<ResponsePagination<User>> {
    const page = query.page || 1;
    const pageSize = query.pageSize || 20;
    const where = isJsonString(query.where) || {};
    const totalItem = await this.prisma.user.count(where);

    const totalPage = Math.ceil(totalItem / pageSize);

    const data = await this.prisma.user.findMany({
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

  createOne(dto: UserCreateDto) {
    return this.prisma.user.create({
      data: dto,
    });
  }

  updateOne(id: number, dto: UserUpdateDto) {
    return this.prisma.user.update({
      data: dto,
      where: {
        id,
      },
    });
  }

  deleteOne(id: number) {
    return this.prisma.user.delete({
      where: {
        id,
      },
    });
  }

  findById(id: number) {
    return this.prisma.user.findUnique({
      where: {
        id,
      },
      include: {
        fiatCurrency: true,
      },
    });
  }
}
