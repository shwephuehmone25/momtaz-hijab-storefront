import { apiClient } from "@/lib/api-client";
import type {
  Category,
  Product,
  PublicCategoriesResponse,
  PublicCategory,
  PublicProduct,
  PublicProductsResponse,
  PublicProductVariant,
} from "@/features/products/types/product";

const FALLBACK_IMAGE = "/image/momataz.webp";
const SWATCH_COLORS = ["#4b4b48", "#c9b8a4", "#b98b85", "#8a7568"];

function variantName(variant: PublicProductVariant) {
  return (
    [variant.color, variant.style, variant.size].filter(Boolean).join(" / ") ||
    variant.sku
  );
}

function colorFor(variant: PublicProductVariant, index: number) {
  return variant.color?.startsWith("#")
    ? variant.color
    : SWATCH_COLORS[index % SWATCH_COLORS.length];
}

function mapProduct(
  product: PublicProduct,
  categoryById: ReadonlyMap<number, PublicCategory>,
): Product {
  const variants = product.variants.map((variant, index) => ({
    id: String(variant.id),
    name: variantName(variant),
    color: variant.color ?? variant.style ?? variant.size ?? variant.sku,
    hex: colorFor(variant, index),
    stock: variant.availableQuantity,
  }));
  const prices = product.variants.map((variant) => Number(variant.price));
  const compareAtPrices = product.variants
    .map((variant) => Number(variant.compareAtPrice))
    .filter((price) => Number.isFinite(price) && price > 0);
  const gallery = product.images.map((image) => image.imageUrl).filter(Boolean);

  return {
    id: String(product.id),
    slug: String(product.id),
    name: product.name,
    categoryId: product.categoryId,
    category: categoryById.get(product.categoryId)?.name ?? "Collection",
    price: prices.length ? Math.min(...prices) : 0,
    originalPrice: compareAtPrices.length
      ? Math.min(...compareAtPrices)
      : undefined,
    rating: 0,
    reviews: 0,
    image: gallery[0] ?? FALLBACK_IMAGE,
    gallery: gallery.length ? gallery : [FALLBACK_IMAGE],
    description: product.description ?? "",
    variants,
  };
}

export async function getProducts(signal?: AbortSignal): Promise<Product[]> {
  const [response, categoryResponse] = await Promise.all([
    apiClient.get<PublicProductsResponse>(
      "/api/v1/products?page=1&limit=100",
      signal,
    ),
    apiClient.get<PublicCategoriesResponse>(
      "/api/v1/admin/categories?page=1&limit=100",
      signal,
    ),
  ]);
  const categoryById = new Map(
    categoryResponse.items.map((category) => [category.id, category]),
  );
  return response.items.map((product) => mapProduct(product, categoryById));
}

export async function getProductById(
  id: number,
  signal?: AbortSignal,
): Promise<Product> {
  const [product, categoryResponse] = await Promise.all([
    apiClient.get<PublicProduct>(`/api/v1/products/${id}`, signal),
    apiClient.get<PublicCategoriesResponse>(
      "/api/v1/admin/categories?page=1&limit=100",
      signal,
    ),
  ]);
  const categoryById = new Map(
    categoryResponse.items.map((category) => [category.id, category]),
  );
  return mapProduct(product, categoryById);
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
