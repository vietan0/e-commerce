import { includeDiscount } from '@/src/lib/commonIncludes';
import getUserId from '@/src/lib/getUserId';
import { prisma } from '@/src/lib/prisma';

export default async function getCartItems() {
  const userId = await getUserId();
  const cart_items = await prisma.cart_item.findMany({
    where: {
      user_id: userId,
    },
    include: {
      product: {
        include: {
          ...includeDiscount,
        },
      },
    },
    orderBy: {
      id: 'desc',
    },
  });

  return cart_items;
}
