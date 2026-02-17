import type { ListBlobResultBlob } from '@vercel/blob';
import type {
  manufacturerGetPayload,
  productGetPayload,
} from '@/src/generated/prisma/models';

type ProductComputedFields = { final_price: string };

export type Product = ProductComputedFields &
  productGetPayload<{
    include: {
      product_image: true;
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
  manufacturers: manufacturerGetPayload<null>[];
}

export type ManufacturersRes = ManufacturersSuccessRes | ErrorRes;

export type BlobsSuccessRes = {
  blobCount: number;
  blobs: ListBlobResultBlob[];
};

export type BlobsRes = BlobsSuccessRes | ErrorRes;
