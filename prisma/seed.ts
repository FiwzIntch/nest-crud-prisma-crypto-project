import { PrismaClient } from '@prisma/client';
import { crypto } from '../src/data/cryptocurrency';
import { fiat } from '../src/data/fiat-currency';
import { order } from '../src/data/order';
import { purchaseOrder } from '../src/data/purchase-order';
// import { transaction } from '../src/data/transaction';
import { user } from '../src/data/user';
import { userCrypto } from '../src/data/user-cryptocurrency';

const prisma = new PrismaClient();

export async function main() {
  await seedDatabase();
}

async function seedDatabase() {
  await seedFiatCurrency();
  await seedCryptocurrency();
  await seedUser();
  await seedUserCryptocurrency();
  await seedOrder();
  await seedPurchaseOrder();
  // await seedTransaction();
}

async function seedFiatCurrency() {
  await prisma.fiatCurrency.createMany({
    data: fiat,
  });
}

async function seedCryptocurrency() {
  await prisma.cryptocurrency.createMany({
    data: crypto,
  });
}

async function seedUser() {
  await prisma.user.createMany({
    data: user,
  });
}

async function seedUserCryptocurrency() {
  await prisma.userCryptocurrency.createMany({
    data: userCrypto,
  });
}

async function seedOrder() {
  await prisma.order.createMany({
    data: order,
  });
}

async function seedPurchaseOrder() {
  await prisma.purchaseOrder.createMany({
    data: purchaseOrder,
  });
}

// async function seedTransaction() {
//   await prisma.transaction.createMany({
//     data: transaction,
//   });
// }

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
