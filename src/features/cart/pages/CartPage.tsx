import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useShopStore } from "@/stores/shop-store";
export function CartPage() {
  const { cart, setQuantity, removeFromCart } = useShopStore();
  const subtotal = cart.reduce((n, i) => n + i.product.price * i.quantity, 0);
  return (
    <section className="container page-space narrow">
      <div className="page-intro">
        <span>YOUR SELECTIONS</span>
        <h1>Shopping bag</h1>
      </div>
      {!cart.length ? (
        <div className="empty">
          <ShoppingBag />
          <h2>Your bag is waiting</h2>
          <p>Discover something made to become a favorite.</p>
          <Link className="button" to="/shop">
            Explore the collection
          </Link>
        </div>
      ) : (
        <div className="cart-layout">
          <div>
            {cart.map((i) => (
              <article
                className="cart-item"
                key={`${i.product.id}-${i.variantId}`}
              >
                <img src={i.product.image} alt={i.product.name} />
                <div>
                  <Link to={`/product/${i.product.slug}`}>
                    {i.product.name}
                  </Link>
                  <p>
                    {
                      i.product.variants.find((v) => v.id === i.variantId)
                        ?.color
                    }
                  </p>
                  <div className="quantity small">
                    <button
                      onClick={() => setQuantity(i.product.id, i.quantity - 1)}
                    >
                      <Minus />
                    </button>
                    <span>{i.quantity}</span>
                    <button
                      onClick={() => setQuantity(i.product.id, i.quantity + 1)}
                    >
                      <Plus />
                    </button>
                  </div>
                </div>
                <strong>${(i.product.price * i.quantity).toFixed(2)}</strong>
                <button
                  className="remove"
                  onClick={() => removeFromCart(i.product.id)}
                  aria-label={`Remove ${i.product.name}`}
                >
                  <Trash2 />
                </button>
              </article>
            ))}
          </div>
          <aside className="summary">
            <h2>Order summary</h2>
            <p>
              <span>Subtotal</span>
              <b>${subtotal.toFixed(2)}</b>
            </p>
            <p>
              <span>Shipping</span>
              <b>{subtotal >= 50 ? "Complimentary" : "Calculated later"}</b>
            </p>
            <div className="total">
              <span>Estimated total</span>
              <b>${subtotal.toFixed(2)}</b>
            </div>
            <Link className="button full" to="/checkout">
              Continue to checkout
            </Link>
            <small>Demonstration only. No payment will be processed.</small>
          </aside>
        </div>
      )}
    </section>
  );
}
