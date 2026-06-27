// @ts-nocheck
import { kebabCase } from 'es-toolkit/string';
import pluralize from 'pluralize';
import { includeColor, productInclude } from '@/src/lib/commonIncludes';
import { prisma } from '@/src/lib/prisma';

const tables = [
  'app_user',
  'brand',
  'camera_system',
  'cart_item',
  'category',
  'charging_technology',
  'connectivity',
  'cpu',
  'delivery_type',
  'discount',
  'discount_product',
  'discount_type',
  'file',
  'gpu',
  'ip_rating',
  'network_technology',
  'order',
  'order_product',
  'order_product_discount',
  'order_status',
  'os',
  'payment_method',
  'payment_status',
  'product',
  'product_category',
  'product_color',
  'product_color_image',
  'product_series',
  'product_variant',
  'ram',
  'serial_unit',
  'serial_unit_status',
  'session',
  'sim',
  'storage',
  'store',
];
export const resources = Object.fromEntries(
  tables.map((t) => [kebabCase(pluralize(t)), prisma[t]]),
);
export const includes: Partial<Record<keyof typeof resources, object>> = {
  cart_items: {
    app_user: true,
  },
  products: productInclude,
  'product-variants': {
    product_color: true,
  },
  'product-color-images': includeColor,
};
