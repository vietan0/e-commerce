import type { ListBlobResultBlob } from '@vercel/blob';
import type { category, manufacturer } from '@/src/generated/prisma/client';
import type { productGetPayload } from '@/src/generated/prisma/models';

type ProductComputedFields = { final_price: string };

export type Product = ProductComputedFields &
  productGetPayload<{
    include: {
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
      manufacturer: true;
      product_category: {
        include: {
          category: true;
        };
      };
    };
  }>;

export interface ProductsSuccessRes {
  rowCount: number;
  totalRowCount: number;
  products: Product[];
}

export interface ErrorRes {
  error: string;
}

export type ProductRes = Product | ErrorRes;
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
