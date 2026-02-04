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

interface Discount_Type {
  id: number;
  name: 'percentage' | 'fixed_amount';
}

interface Discount {
  id: number;
  name: string;
  value: string;
  type: Discount_Type['id'];
  created_at: string;
}

export interface Product {
  id: string;
  name: string;
  base_price: string;
  final_price: string;
  description: string | null;
  thumbnail: string | null;
  stock: number;
  created_at: string;
  updated_at: string | null;
  manufacturer_id: string;
  manufacturer_name: string;
  discount_name: Discount['name'] | null;
  discount_value: Discount['value'] | null;
  discount_type_name: Discount_Type['name'] | null;
}

export interface ProductImage {
  id: string;
  product_id: Product['id'];
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
