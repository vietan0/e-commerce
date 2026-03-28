import getSession from '@/app/api/(auth)/_lib/getSession';
import { includeDiscount } from '@/src/lib/price';
import { prisma } from '@/src/lib/prisma';

export default async function getCartItems() {
  const { session } = await getSession();
  const cart_items = await prisma.cart_item.findMany({
    where: {
      app_user: {
        id: session!.app_user.id,
      },
    },
    include: {
      product: {
        include: {
          ...includeDiscount,
          thumbnail: true,
        },
      },
    },
    orderBy: {
      id: 'desc',
    },
  });

  return cart_items;
}
