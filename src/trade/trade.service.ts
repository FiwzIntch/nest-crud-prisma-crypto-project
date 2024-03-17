import { Injectable } from '@nestjs/common';
import { Status } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { TransactionService } from 'src/transaction/transaction.service';

@Injectable()
export class TradeService {
  constructor(
    private prisma: PrismaService,
    private transactionService: TransactionService,
  ) {
    //
  }

  async trade() {
    const orders = await this.prisma.order.findMany({
      where: {
        status: Status.PENDING,
      },
    });

    for (const order of orders) {
      // find purchase
      const purchase = await this.prisma.purchaseOrder.findFirst({
        where: {
          cryptoId: order.cryptoId,
          status: Status.PENDING,
          userId: {
            not: order.userId,
          },
          amount: order.amount,
        },
        include: {
          crypto: true,
        },
      });

      if (purchase) {
        // create transaction
        try {
          const transaction = await this.transactionService.createOne({
            cryptoId: order.cryptoId,
            purchaseId: purchase.id,
            orderId: order.id,
            amount: purchase.amount,
            unitPrice: purchase.crypto.price,
          });

          if (transaction) {
            await this.prisma.order.update({
              where: {
                id: order.id,
              },
              data: {
                status: Status.COMPLETE,
              },
            });

            await this.prisma.purchaseOrder.update({
              where: {
                id: order.id,
              },
              data: {
                status: Status.COMPLETE,
              },
            });
          }
        } catch (error: any) {
          console.log(error.message);
        }
      }
    }

    return {
      success: true,
    };
  }
}
