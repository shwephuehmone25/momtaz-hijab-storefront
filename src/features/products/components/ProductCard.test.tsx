import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { beforeEach, describe, expect, it } from "vitest";
import { products } from "../services/product-service";
import { ProductCard } from "./ProductCard";
import { useShopStore } from "@/stores/shop-store";
describe("ProductCard", () => {
  beforeEach(() => useShopStore.setState({ cart: [], wishlist: [] }));
  it("adds a product to the cart", async () => {
    render(
      <MemoryRouter>
        <ProductCard product={products[0]} />
      </MemoryRouter>,
    );
    await userEvent.click(screen.getByRole("button", { name: /quick add/i }));
    expect(useShopStore.getState().cart[0].product.id).toBe(products[0].id);
  });
  it("toggles wishlist", async () => {
    render(
      <MemoryRouter>
        <ProductCard product={products[0]} />
      </MemoryRouter>,
    );
    await userEvent.click(
      screen.getByRole("button", { name: /add .* to wishlist/i }),
    );
    expect(useShopStore.getState().wishlist).toContain(products[0].id);
  });
});
