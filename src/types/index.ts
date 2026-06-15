import type { ListBlobResultBlob } from '@vercel/blob';
import type {
  brand,
  camera_system,
  category,
  charging_technology,
  cpu,
  gpu,
  ip_rating,
  network_technology,
  os,
  product_series,
  sim,
} from '@/src/generated/prisma/client';
import type {
  orderGetPayload,
  productGetPayload,
} from '@/src/generated/prisma/models';
import type { orderInclude, productInclude } from '@/src/lib/commonIncludes';

export type Product = productGetPayload<{
  include: typeof productInclude;
}>;

type ProductSuccessRes = { product: Product };

export interface ProductsSuccessRes {
  rowCount: number;
  totalRowCount: number;
  products: Product[];
}

export interface ErrorRes {
  error: string;
}

export type ProductRes = ProductSuccessRes | ErrorRes;
export type ProductsRes = ProductsSuccessRes | ErrorRes;

export interface SuccessRes<T> {
  rowCount: number;
  totalRowCount: number;
  rows: T[];
}

export type DataRes<T> = SuccessRes<T> | ErrorRes;

export type EndpointMap = {
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
};

export type BlobsSuccessRes = {
  blobCount: number;
  blobs: ListBlobResultBlob[];
};

export type BlobsRes = BlobsSuccessRes | ErrorRes;

export interface CategoriesSuccessRes {
  rowCount: number;
  totalRowCount: number;
  categories: category[];
}

export type CategoriesRes = CategoriesSuccessRes | ErrorRes;

export type OrderCommon = orderGetPayload<{
  include: typeof orderInclude;
}>;
