import { Status } from '@prisma/client';

export interface OrderCreate {
  amount: number;
  unitPrice: number;
  status: Status;
  cryptoId: number;
  userId: number;
}
