import type { ListBlobResultBlob } from '@vercel/blob';
import type {
  brand,
  camera_system,
  category,
  charging_technology,
  connectivity,
  cpu,
  delivery_type,
  gpu,
  ip_rating,
  network_technology,
  order,
  order_status,
  os,
  Prisma,
  product_color,
  product_series,
  ram,
  sim,
  storage,
  store,
} from '@/src/generated/prisma/client';
import type {
  orderGetPayload,
  productGetPayload,
} from '@/src/generated/prisma/models';
import type {
  includeColor,
  orderInclude,
  productInclude,
} from '@/src/lib/commonIncludes';

export interface ErrorRes {
  error: string;
}

export interface GetManySuccessRes<T> {
  rowCount: number;
  totalRowCount: number;
  data: T[];
}

export type GetManyRes<T> = GetManySuccessRes<T> | ErrorRes;

export type GetOneRes<T> = T | ErrorRes;

/**
 * Should match 'includes' in api/_utils/resources.ts
 */
type WithIncludes = {
  orders: Prisma.orderGetPayload<{ include: typeof orderInclude }>;
  products: Prisma.productGetPayload<{ include: typeof productInclude }>;
  'product-variants': Prisma.product_variantGetPayload<{
    include: { product_color: true };
  }>;
  'product-color-images': Prisma.product_color_imageGetPayload<{
    include: typeof includeColor;
  }>;
  'cart-items': Prisma.cart_itemGetPayload<{ include: { app_user: true } }>;
};

type BaseResourceMap = {
  categories: category;
  brands: brand;
  'product-series': product_series;
  os: os;
  cpus: cpu;
  gpus: gpu;
  sims: sim;
  'camera-systems': camera_system;
  'network-technologies': network_technology;
  'charging-technologies': charging_technology;
  'ip-ratings': ip_rating;
  rams: ram;
  storages: storage;
  connectivities: connectivity;
  'product-colors': product_color;
  'delivery-types': delivery_type;
  orders: order;
  'order-statuses': order_status;
  stores: store;
};

export type ResourceMap = Omit<BaseResourceMap, keyof WithIncludes> &
  WithIncludes;

export type BlobsSuccessRes = {
  blobCount: number;
  blobs: ListBlobResultBlob[];
};

export type BlobsRes = BlobsSuccessRes | ErrorRes;

export type ProductFull = productGetPayload<{
  include: typeof productInclude;
}>;

export type OrderFull = orderGetPayload<{
  include: typeof orderInclude;
}>;
