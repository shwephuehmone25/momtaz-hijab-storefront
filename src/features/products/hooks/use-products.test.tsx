import { renderHook, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { fallbackProducts } from "../data/fallback-products";
import { getProductById, getProducts } from "../services/product-service";
import { useProduct, useProducts } from "./use-products";

vi.mock("../services/product-service", () => ({
  getProducts: vi.fn(),
  getProductById: vi.fn(),
}));

describe("product API fallbacks", () => {
  beforeEach(() => {
    vi.mocked(getProducts).mockRejectedValue(new Error("API unavailable"));
    vi.mocked(getProductById).mockRejectedValue(new Error("API unavailable"));
  });

  it("shows the local catalog when the products API fails", async () => {
    const { result } = renderHook(() => useProducts());

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.error).toBeNull();
    expect(result.current.usingFallback).toBe(true);
    expect(result.current.products).toEqual(fallbackProducts);
  });

  it("shows a local product detail when its API request fails", async () => {
    const fallback = fallbackProducts[0];
    const { result } = renderHook(() => useProduct(Number(fallback.id)));

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.error).toBeNull();
    expect(result.current.usingFallback).toBe(true);
    expect(result.current.product).toEqual(fallback);
  });
});
