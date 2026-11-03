import { beforeEach, describe, expect, it, vi } from "vitest";
import { apiClient } from "@/lib/api-client";
import { getProductById, getProducts } from "./product-service";
import type { PublicProduct } from "../types/product";

const apiProduct: PublicProduct = {
  id: 42,
  slug: "42",
  categoryId: 3,
  category: "Hijab",
  categoryDetails: {
    id: 3,
    parentId: null,
    name: "Hijab",
    description: null,
    imageUrl: null,
  },
  name: "Everyday Hijab",
  description: "Soft and comfortable",
  price: 29.99,
  originalPrice: 39.99,
  image: "https://cdn.example.com/hijab.jpg",
  gallery: ["https://cdn.example.com/hijab.jpg"],
  rating: 4.8,
  reviews: 12,
  isNew: true,
  isBestSeller: true,
  bestSellerOrder: 1,
  availableQuantity: 6,
  inStock: true,
  images: [
    { id: 1, imageUrl: "https://cdn.example.com/hijab.jpg", sortOrder: 0 },
  ],
  variants: [
    {
      id: 7,
      sku: "HIJAB-BLACK",
      color: "Black",
      style: null,
      size: null,
      price: "29.99",
      compareAtPrice: "39.99",
      name: "Black",
      stock: 6,
      availableQuantity: 6,
      inStock: true,
    },
  ],
};

describe("product service", () => {
  beforeEach(() => vi.restoreAllMocks());

  it("loads and maps the public product collection", async () => {
    const get = vi.spyOn(apiClient, "get").mockResolvedValueOnce({
      items: [apiProduct],
      page: 1,
      limit: 100,
      total: 1,
    });

    const products = await getProducts();

    expect(get).toHaveBeenCalledWith(
      "/api/v1/products?page=1&limit=100",
      undefined,
    );
    expect(products[0]).toMatchObject({
      id: "42",
      slug: "42",
      price: 29.99,
      originalPrice: 39.99,
      image: "https://cdn.example.com/hijab.jpg",
      category: "Hijab",
    });
  });

  it("loads a product by its public id", async () => {
    const get = vi.spyOn(apiClient, "get").mockResolvedValueOnce(apiProduct);

    const product = await getProductById(42);

    expect(get).toHaveBeenCalledWith("/api/v1/products/42", undefined);
    expect(product.name).toBe("Everyday Hijab");
  });
});
