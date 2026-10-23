import { beforeEach, describe, expect, it, vi } from "vitest";
import { apiClient } from "@/lib/api-client";
import { getProductById, getProducts } from "./product-service";
import type { PublicProduct } from "../types/product";

const apiProduct: PublicProduct = {
  id: 42,
  categoryId: 3,
  name: "Everyday Hijab",
  description: "Soft and comfortable",
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
      availableQuantity: 6,
      inStock: true,
    },
  ],
};

const categoryResponse = {
  items: [{ id: 3, parentId: null, name: "Hijab" }],
  page: 1,
  limit: 100,
  total: 1,
};

describe("product service", () => {
  beforeEach(() => vi.restoreAllMocks());

  it("loads and maps the public product collection", async () => {
    const get = vi
      .spyOn(apiClient, "get")
      .mockResolvedValueOnce({
        items: [apiProduct],
        page: 1,
        limit: 100,
        total: 1,
      })
      .mockResolvedValueOnce(categoryResponse);

    const products = await getProducts();

    expect(get).toHaveBeenCalledWith(
      "/api/v1/products?page=1&limit=100",
      undefined,
    );
    expect(get).toHaveBeenCalledWith(
      "/api/v1/admin/categories?page=1&limit=100",
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
    const get = vi
      .spyOn(apiClient, "get")
      .mockResolvedValueOnce(apiProduct)
      .mockResolvedValueOnce(categoryResponse);

    const product = await getProductById(42);

    expect(get).toHaveBeenCalledWith("/api/v1/products/42", undefined);
    expect(product.name).toBe("Everyday Hijab");
  });
});
