import { AlertCircle, Heart, LoaderCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { ProductCard } from "@/features/products/components/ProductCard";
import { useProducts } from "@/features/products/hooks/use-products";
import { useShopStore } from "@/stores/shop-store";
export function WishlistPage() {
  const { products, loading, error, retry } = useProducts();
  const ids = useShopStore((s) => s.wishlist);
  const items = products.filter((p) => ids.includes(p.id));
  return (
    <section className="container page-space">
      <div className="page-intro">
        <span>SAVED FOR LATER</span>
        <h1>Your wishlist</h1>
      </div>
      {loading ? (
        <div className="empty" role="status">
          <LoaderCircle className="loading-spinner" />
          <h2>Loading your wishlist</h2>
        </div>
      ) : error ? (
        <div className="empty" role="alert">
          <AlertCircle />
          <h2>We couldn’t load your wishlist</h2>
          <p>{error}</p>
          <button className="button" onClick={retry}>
            Try again
          </button>
        </div>
      ) : items.length ? (
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
