interface ResMeta {
  totalRows: number;
  totalProducts: number;
  totalPages: number;
  page: number;
}

interface ResLinks {
  self: string;
  first: string;
  last: string;
  prev?: string;
  next?: string;
}

export interface Product {
  id: string;
  name: string;
  price: string;
  description: string | null;
  thumbnail: string | null;
  stock: number;
  created_at: string;
  updated_at: string | null;
  manufacturer_id: string;
  category_name: string;
  manufacturer_name: string;
}

export interface ProductImage {
  id: string;
  product_id: string;
  url: string;
}

export interface ProductsSuccessRes {
  meta: ResMeta;
  links: ResLinks;
  products: Product[];
}

export type ProductsRes = ProductsSuccessRes | ErrorRes;

export interface ProductSuccessRes extends Product {
  images: ProductImage[];
}

export interface ErrorRes {
  error: string;
}

export type ProductRes = ProductSuccessRes | ErrorRes;
