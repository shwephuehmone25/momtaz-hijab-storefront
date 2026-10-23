export type Category = string;
export interface ProductVariant {
  id: string;
  name: string;
  color: string;
  hex: string;
  stock: number;
}
export interface Product {
  id: string;
  slug: string;
  name: string;
  categoryId: number;
  category: Category;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  image: string;
  gallery: string[];
  description: string;
  isNew?: boolean;
  featured?: boolean;
  variants: ProductVariant[];
}

export interface PublicProductImage {
  id: number;
  imageUrl: string;
  sortOrder: number;
}

export interface PublicProductVariant {
  id: number;
  sku: string;
  color: string | null;
  style: string | null;
  size: string | null;
  price: string;
  compareAtPrice: string | null;
  availableQuantity: number;
  inStock: boolean;
}

export interface PublicProduct {
  id: number;
  categoryId: number;
  name: string;
  description: string | null;
  images: PublicProductImage[];
  variants: PublicProductVariant[];
}

export interface PublicProductsResponse {
  items: PublicProduct[];
  page: number;
  limit: number;
  total: number;
}

export interface PublicCategory {
  id: number;
  parentId: number | null;
  name: string;
}

export interface PublicCategoriesResponse {
  items: PublicCategory[];
  page: number;
  limit: number;
  total: number;
}
