import { Heart, Menu, Search, ShoppingBag, UserRound, X } from "lucide-react";
import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { categories } from "@/features/products/services/product-service";
import { useShopStore } from "@/stores/shop-store";

export function Header() {
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const cart = useShopStore((state) =>
    state.cart.reduce((count, item) => count + item.quantity, 0),
  );
  const wishes = useShopStore((state) => state.wishlist.length);
  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    if (search.trim()) navigate(`/shop?q=${encodeURIComponent(search.trim())}`);
  };

  return (
    <>
      <div className="announcement">Free Shipping on orders over $50</div>
      <header className="header reference-header">
        <div className="reference-nav">
          <div className="reference-brand-group">
            <Link to="/" className="brand">
              <img src="/image/momataz.webp" alt="Momataz" />
              <span>MOMATAZ</span>
            </Link>
            <button
              className="mobile-menu-trigger"
              onClick={() => setOpen(true)}
            >
              <Menu />
              <span>Menu</span>
            </button>
          </div>
          <nav className="desktop-nav" aria-label="Main navigation">
            <NavLink to="/">Home</NavLink>
            {categories.map((category) => (
              <NavLink
                key={category}
                to={
                  category === "New"
                    ? "/new"
                    : `/shop/${category.toLowerCase().replaceAll(" ", "-")}`
                }
              >
                {category}
              </NavLink>
            ))}
            <NavLink to="/contact">Contact Us</NavLink>
          </nav>
          <div className="header-actions">
            <form
              className={searchOpen ? "nav-search is-open" : "nav-search"}
              onSubmit={submit}
            >
              <input
                aria-label="Search products"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search products..."
              />
              <button
                type="button"
                aria-label="Open search"
                onClick={() => setSearchOpen(!searchOpen)}
              >
                <Search />
              </button>
            </form>
            <Link to="/account" aria-label="Account">
              <UserRound />
            </Link>
            <Link to="/wishlist" aria-label={`Wishlist, ${wishes} items`}>
              <Heart />
              <em>{wishes}</em>
            </Link>
            <Link to="/cart" aria-label={`Cart, ${cart} items`}>
              <ShoppingBag />
              <em>{cart}</em>
            </Link>
          </div>
        </div>
      </header>
      <aside
        className={`mobile-drawer ${open ? "is-open" : ""}`}
        aria-hidden={!open}
      >
        <button
          className="icon-button close"
          onClick={() => setOpen(false)}
          aria-label="Close menu"
        >
          <X />
        </button>
        <Link
          to="/"
          onClick={() => setOpen(false)}
          className="brand drawer-brand"
        >
          <img src="/image/momataz.webp" alt="" />
          MOMATAZ
        </Link>
        <form className="drawer-search" onSubmit={submit}>
          <Search />
          <input
            aria-label="Search products"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search products..."
          />
        </form>
        <nav>
          {["Home", ...categories, "Contact"].map((item) => (
            <NavLink
              key={item}
              onClick={() => setOpen(false)}
              to={
                item === "Home"
                  ? "/"
                  : item === "Contact"
                    ? "/contact"
                    : item === "New"
                      ? "/new"
                      : `/shop/${item.toLowerCase().replaceAll(" ", "-")}`
              }
            >
              {item}
            </NavLink>
          ))}
        </nav>
        <Link className="drawer-account" to="/account">
          <UserRound /> User Account
        </Link>
      </aside>
      {open && (
        <button
          className="scrim"
          aria-label="Close menu"
          onClick={() => setOpen(false)}
        />
      )}
    </>
  );
}
