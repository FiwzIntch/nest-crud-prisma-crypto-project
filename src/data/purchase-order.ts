import { Status } from '@prisma/client';

export const purchaseOrder = [
  {
    cryptoId: 1,
    userId: 2,
    amount: 50,
    unitPrice: 3.44,
    status: Status.PENDING,
  },
  {
    cryptoId: 3,
    userId: 1,
    amount: 50,
    unitPrice: 1.213,
    status: Status.PENDING,
  },
];
