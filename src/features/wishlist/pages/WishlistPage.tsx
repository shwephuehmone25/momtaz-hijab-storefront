import { Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { ProductCard } from "@/features/products/components/ProductCard";
import { products } from "@/features/products/services/product-service";
import { useShopStore } from "@/stores/shop-store";
export function WishlistPage() {
  const ids = useShopStore((s) => s.wishlist);
  const items = products.filter((p) => ids.includes(p.id));
  return (
    <section className="container page-space">
      <div className="page-intro">
        <span>SAVED FOR LATER</span>
        <h1>Your wishlist</h1>
      </div>
      {items.length ? (
        <div className="product-grid">
          {items.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <Heart />
          <h2>Save what speaks to you</h2>
          <p>Tap the heart on any piece to keep it here.</p>
          <Link className="button" to="/shop">
            Browse the collection
          </Link>
        </div>
      )}
    </section>
  );
}
