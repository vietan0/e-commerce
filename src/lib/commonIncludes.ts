import type { Prisma } from '@/src/generated/prisma/client';

export const includeDiscount = {
  discount_product: {
    include: {
      discount: {
        include: {
          discount_type: true,
        },
      },
    },
  },
} satisfies Prisma.productInclude;

export const orderInclude = {
  delivery_type: true,
  order_status: true,
  payment_method: true,
  payment_status: true,
  store: true,
  order_product: {
    include: {
      product: {
        include: includeDiscount,
      },
    },
  },
  app_user: {
    omit: {
      password: true,
    },
  },
} satisfies Prisma.orderInclude;
