import { Status } from '@prisma/client';

export interface PurchaseOrderCreate {
  amount: number;
  unitPrice: number;
  status: Status;
  cryptoId: number;
  userId: number;
}
