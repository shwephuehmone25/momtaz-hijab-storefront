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
  name: string;
  stock: number;
  availableQuantity: number;
  inStock: boolean;
}

export interface PublicProductCategory {
  id: number;
  parentId: number | null;
  name: string;
  description: string | null;
  imageUrl: string | null;
}

export interface PublicProduct {
  id: number;
  slug: string;
  categoryId: number;
  category: string;
  categoryDetails: PublicProductCategory;
  name: string;
  description: string | null;
  price: number;
  originalPrice: number | null;
  image: string | null;
  gallery: string[];
  rating: number;
  reviews: number;
  isNew: boolean;
  isBestSeller: boolean;
  bestSellerOrder: number | null;
  availableQuantity: number;
  inStock: boolean;
  images: PublicProductImage[];
  variants: PublicProductVariant[];
}

export interface PublicProductsResponse {
  items: PublicProduct[];
  page: number;
  limit: number;
  total: number;
}
