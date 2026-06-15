import getUserId from '@/src/lib/getUserId';
import { prisma } from '@/src/lib/prisma';

export default async function getCartItems() {
  const userId = await getUserId();
  const cart_items = await prisma.cart_item.findMany({
    where: {
      user_id: userId,
    },
    include: {
      product_variant: true,
    },
    orderBy: {
      id: 'desc',
    },
  });

  return cart_items;
}
