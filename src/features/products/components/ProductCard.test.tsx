import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { beforeEach, describe, expect, it } from "vitest";
import { ProductCard } from "./ProductCard";
import { useShopStore } from "@/stores/shop-store";
import type { Product } from "../types/product";

const product: Product = {
  id: "1",
  slug: "1",
  name: "Test Hijab",
  categoryId: 1,
  category: "Hijab",
  price: 29.99,
  rating: 0,
  reviews: 0,
  image: "/image/hijab_img.jpg",
  gallery: ["/image/hijab_img.jpg"],
  description: "Test product",
  variants: [{ id: "1", name: "Black", color: "Black", hex: "#000", stock: 5 }],
};
describe("ProductCard", () => {
  beforeEach(() => useShopStore.setState({ cart: [], wishlist: [] }));
  it("adds a product to the cart", async () => {
    render(
      <MemoryRouter>
        <ProductCard product={product} />
      </MemoryRouter>,
    );
    await userEvent.click(screen.getByRole("button", { name: /quick add/i }));
    expect(useShopStore.getState().cart[0].product.id).toBe(product.id);
  });
  it("toggles wishlist", async () => {
    render(
      <MemoryRouter>
        <ProductCard product={product} />
      </MemoryRouter>,
    );
    await userEvent.click(
      screen.getByRole("button", { name: /add .* to wishlist/i }),
    );
    expect(useShopStore.getState().wishlist).toContain(product.id);
  });
});
