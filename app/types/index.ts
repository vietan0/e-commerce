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

export interface ProductRes {
  meta: ResMeta;
  links: ResLinks;
  products: Product[];
}
