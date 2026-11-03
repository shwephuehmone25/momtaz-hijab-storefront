import { apiClient } from "@/lib/api-client";
import type {
  Category,
  Product,
  PublicProduct,
  PublicProductsResponse,
  PublicProductVariant,
} from "@/features/products/types/product";

const FALLBACK_IMAGE = "/image/momataz.webp";
const SWATCH_COLORS = ["#4b4b48", "#c9b8a4", "#b98b85", "#8a7568"];

function variantName(variant: PublicProductVariant) {
  return variant.name;
}

function colorFor(variant: PublicProductVariant, index: number) {
  return variant.color?.startsWith("#")
    ? variant.color
    : SWATCH_COLORS[index % SWATCH_COLORS.length];
}

function mapProduct(product: PublicProduct): Product {
  const variants = product.variants.map((variant, index) => ({
    id: String(variant.id),
    name: variantName(variant),
    color: variant.color ?? variant.style ?? variant.size ?? variant.sku,
    hex: colorFor(variant, index),
    stock: variant.availableQuantity,
  }));
  const gallery = product.gallery.filter(Boolean);

  return {
    id: String(product.id),
    slug: product.slug,
    name: product.name,
    categoryId: product.categoryId,
    category: product.category,
    price: product.price,
    originalPrice: product.originalPrice ?? undefined,
    rating: product.rating,
    reviews: product.reviews,
    image: product.image ?? gallery[0] ?? FALLBACK_IMAGE,
    gallery: gallery.length ? gallery : [FALLBACK_IMAGE],
    description: product.description ?? "",
    isNew: product.isNew,
    featured: product.isBestSeller,
    variants,
  };
}

export async function getProducts(signal?: AbortSignal): Promise<Product[]> {
  const response = await apiClient.get<PublicProductsResponse>(
    "/api/v1/products?page=1&limit=100",
    signal,
  );
  return response.items.map(mapProduct);
}

export async function getProductById(
  id: number,
  signal?: AbortSignal,
): Promise<Product> {
  const product = await apiClient.get<PublicProduct>(
    `/api/v1/products/${id}`,
    signal,
  );
  return mapProduct(product);
}

export function categorySlug(category: string) {
  return category.trim().toLowerCase().replaceAll(" ", "-");
}

export const categories: Category[] = [
  "New",
  "Dresses",
  "Hijab",
  "Instant Hijab",
  "Prayer Hijab",
  "Kid Hijab",
  "Apparel",
  "Accessories",
];
