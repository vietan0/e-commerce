import type { ListBlobResultBlob } from '@vercel/blob';
import type {
  brand,
  camera_system,
  category,
  charging_technology,
  connectivity,
  cpu,
  gpu,
  ip_rating,
  network_technology,
  os,
  product_color,
  product_series,
  ram,
  sim,
  storage,
} from '@/src/generated/prisma/client';
import type {
  orderGetPayload,
  productGetPayload,
} from '@/src/generated/prisma/models';
import type { orderInclude, productInclude } from '@/src/lib/commonIncludes';

export interface ErrorRes {
  error: string;
}

export interface GetManySuccessRes<T> {
  rowCount: number;
  totalRowCount: number;
  rows: T[];
}

export type GetManyRes<T> = GetManySuccessRes<T> | ErrorRes;

export type GetOneRes<T> = T | ErrorRes; // T should be in the shape of { product: ProductFull }

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
  rams: ram;
  storages: storage;
  connectivities: connectivity;
  'product-colors': product_color;
};

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
