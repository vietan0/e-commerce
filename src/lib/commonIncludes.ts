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

export const productInclude = {
  brand: true,
  product_series: true,
  camera_system: true,
  network_technology: true,
  charging_technology: true,
  os: true,
  cpu: true,
  gpu: true,
  sim: true,
  ip_rating: true,
  product_category: {
    include: {
      category: true,
    },
  },
  product_color: {
    include: {
      product_color_image: true,
      product_variant: {
        include: {
          ram: true,
          connectivity: true,
          storage: true,
          product_color: true,
        },
      },
    },
  },
  ...includeDiscount,
} satisfies Prisma.productInclude;

export const orderProductInclude = {
  product: {
    include: {
      thumbnail: true,
    },
  },
  orderProductDiscounts: true,
};

export const orderInclude = {
  delivery_type: true,
  order_status: true,
  payment_method: true,
  payment_status: true,
  store: true,
  order_product: {
    include: orderProductInclude,
  },
  app_user: {
    omit: {
      password: true,
    },
  },
} satisfies Prisma.orderInclude;
