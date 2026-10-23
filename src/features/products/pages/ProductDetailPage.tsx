import {
  AlertCircle,
  Check,
  Heart,
  LoaderCircle,
  Minus,
  Plus,
  ShieldCheck,
  Truck,
} from "lucide-react";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ProductCard } from "../components/ProductCard";
import { useProduct, useProducts } from "../hooks/use-products";
import { useShopStore } from "@/stores/shop-store";
export function ProductDetailPage() {
  const { slug } = useParams();
  const productId = slug && /^\d+$/.test(slug) ? Number(slug) : undefined;
  const { product: p, loading, error, retry } = useProduct(productId);
  const { products: relatedProducts } = useProducts();
  const [selection, setSelection] = useState({
    productId: "",
    photo: "",
    variant: "",
    qty: 1,
  });
  const add = useShopStore((s) => s.addToCart);
  const toggle = useShopStore((s) => s.toggleWishlist);
  const wished = useShopStore((s) => (p ? s.wishlist.includes(p.id) : false));
  if (loading)
    return (
      <div className="empty page-space" role="status">
        <LoaderCircle className="loading-spinner" />
        <h1>Loading product</h1>
      </div>
    );
  if (error)
    return (
      <div className="empty page-space" role="alert">
        <AlertCircle />
        <h1>We couldn’t load this product</h1>
        <p>{error}</p>
        <button className="button" onClick={retry}>
          Try again
        </button>
      </div>
    );
  if (!p)
    return (
      <div className="empty page-space">
        <h1>Product not found</h1>
        <Link className="button" to="/shop">
          Return to shop
        </Link>
      </div>
    );
  const current =
    selection.productId === p.id
      ? selection
      : {
          productId: p.id,
          photo: p.image,
          variant: p.variants[0]?.id ?? "",
          qty: 1,
        };
  const addMany = () => {
    for (let i = 0; i < current.qty; i++) add(p, current.variant);
  };
  return (
    <section className="container page-space">
      <div className="breadcrumbs">
        <Link to="/">Home</Link> / <Link to="/shop">Shop</Link> / {p.name}
      </div>
      <div className="product-detail">
        <div className="gallery">
          <div className="thumbs">
            {p.gallery.map((x) => (
              <button
                key={x}
                onClick={() => setSelection({ ...current, photo: x })}
                className={current.photo === x ? "active" : ""}
              >
                <img src={x} alt="" />
              </button>
            ))}
          </div>
          <div className="main-photo">
            <img src={current.photo} alt={p.name} />
          </div>
        </div>
        <div className="details">
          <span className="eyebrow">{p.category}</span>
          <h1>{p.name}</h1>
          {p.reviews > 0 && (
            <p className="rating">
              ★ {p.rating} <span>({p.reviews} reviews)</span>
            </p>
          )}
          <p className="detail-price">
            ${p.price.toFixed(2)}{" "}
            {p.originalPrice && <del>${p.originalPrice.toFixed(2)}</del>}
          </p>
          <p className="description">{p.description}</p>
          <fieldset>
            <legend>
              Color:{" "}
              <b>{p.variants.find((v) => v.id === current.variant)?.color}</b>
            </legend>
            <div className="swatches">
              {p.variants.map((v) => (
                <button
                  key={v.id}
                  onClick={() => setSelection({ ...current, variant: v.id })}
                  className={current.variant === v.id ? "active" : ""}
                  aria-label={v.color}
                  title={v.color}
                  style={{ background: v.hex }}
                >
                  {current.variant === v.id && <Check />}
                </button>
              ))}
            </div>
          </fieldset>
          <div className="buy-row">
            <div className="quantity">
              <button
                onClick={() =>
                  setSelection({
                    ...current,
                    qty: Math.max(1, current.qty - 1),
                  })
                }
                aria-label="Decrease quantity"
              >
                <Minus />
              </button>
              <span>{current.qty}</span>
              <button
                onClick={() =>
                  setSelection({ ...current, qty: current.qty + 1 })
                }
                aria-label="Increase quantity"
              >
                <Plus />
              </button>
            </div>
            <button className="button grow" onClick={addMany}>
              Add to bag
            </button>
            <button
              className={`icon-button detail-wish ${wished ? "active" : ""}`}
              onClick={() => toggle(p.id)}
              aria-label="Toggle wishlist"
            >
              <Heart />
            </button>
          </div>
          <div className="assurances">
            <p>
              <Truck /> Free shipping over $50
            </p>
            <p>
              <ShieldCheck /> Secure demonstration checkout
            </p>
          </div>
        </div>
      </div>
      <div className="section-heading related">
        <h2>You may also love</h2>
      </div>
      <div className="product-grid home-products">
        {relatedProducts
          .filter((x) => x.id !== p.id)
          .slice(0, 4)
          .map((x) => (
            <ProductCard key={x.id} product={x} />
          ))}
      </div>
    </section>
  );
}
