import type { ListBlobResultBlob } from '@vercel/blob';
import type { category, manufacturer } from '@/src/generated/prisma/client';
import type {
  orderGetPayload,
  productGetPayload,
} from '@/src/generated/prisma/models';
import type { orderInclude } from '@/src/lib/commonIncludes';

type ProductComputedFields = { final_price: string };

export type Product = ProductComputedFields &
  productGetPayload<{
    include: {
      manufacturer: true;
      thumbnail: true;
      product_image: {
        include: {
          file: true;
        };
      };
      discount_product: {
        include: {
          discount: {
            include: {
              discount_type: true;
            };
          };
        };
      };
      product_category: {
        include: {
          category: true;
        };
      };
    };
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

export interface ManufacturersSuccessRes {
  rowCount: number;
  totalRowCount: number;
  manufacturers: manufacturer[];
}

export type ManufacturersRes = ManufacturersSuccessRes | ErrorRes;

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
