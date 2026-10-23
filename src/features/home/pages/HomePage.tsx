import {
  ArrowLeft,
  ArrowRight,
  Headphones,
  Instagram,
  LoaderCircle,
  PlayCircle,
  RotateCcw,
  ShieldCheck,
  Truck,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ProductCard } from "@/features/products/components/ProductCard";
import { useProducts } from "@/features/products/hooks/use-products";

const categories = [
  ["Dresses", "chiffron.jpg"],
  ["Hijab", "Instant Hijab.jpg"],
  ["Instant Hijab", "Prayer Hijab.jpg"],
  ["Prayer Hijab", "Kids Hijab.jpg"],
  ["Kid Hijab", "Apparel.jpg"],
  ["Apparel", "Instant Hijab.jpg"],
  ["Accessories", "chiffron.jpg"],
] as const;
const styleCards = [
  ["Classic Chiffon", "chiffron.jpg"],
  ["Chiffon Pleated", "banner.jpg"],
  ["Cotton Lace", "Prayer Hijab.jpg"],
  ["Chiffon Crinkle", "Instant Hijab.jpg"],
] as const;
const looks = [
  "Apparel.jpg",
  "banner.jpg",
  "chiffron.jpg",
  "Kids Hijab.jpg",
  "Instant Hijab.jpg",
  "Prayer Hijab.jpg",
] as const;
const features: Array<{ icon: LucideIcon; title: string; text: string }> = [
  { icon: Truck, title: "Free Shipping", text: "On orders over $50" },
  { icon: RotateCcw, title: "Easy Returns", text: "30-day money back" },
  {
    icon: ShieldCheck,
    title: "Secure Payment",
    text: "100% protected checkout",
  },
  { icon: Headphones, title: "24/7 Support", text: "Dedicated support team" },
];
const slug = (name: string) =>
  `/shop/${name.toLowerCase().replaceAll(" ", "-")}`;

export function HomePage() {
  const { products, loading, error, retry } = useProducts();
  const page = useRef<HTMLDivElement>(null);
  const categoryTrack = useRef<HTMLDivElement>(null);
  const scrollCategories = (direction: number) =>
    categoryTrack.current?.scrollBy({
      left: direction * 360,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
    });

  useEffect(() => {
    const root = page.current;
    if (!root) return;

    const items = Array.from(
      root.querySelectorAll<HTMLElement>(
        "[data-reveal], .home-products > .product-card",
      ),
    );
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    items.forEach((item, index) => {
      item.classList.add("reveal-item");
      item.style.setProperty("--reveal-delay", `${(index % 4) * 65}ms`);
      if (reduceMotion) item.classList.add("is-visible");
    });

    if (reduceMotion || !("IntersectionObserver" in window)) {
      items.forEach((item) => item.classList.add("is-visible"));
      return;
    }

    root.classList.add("reveal-ready");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -8%", threshold: 0.08 },
    );
    items.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, [loading, products.length]);

  return (
    <div className="reference-home" ref={page}>
      <section className="reference-hero">
        <div className="reference-hero-content" data-reveal>
          <span>NEW ARRIVAL</span>
          <h1>Elevate Your Everyday Style</h1>
          <p>
            Discover timeless pieces crafted for comfort, designed for elegance,
            made for you.
          </p>
          <div className="reference-hero-actions">
            <Link className="ref-button ref-button-light" to="/new">
              Shop Now <ArrowRight />
            </Link>
            <a className="ref-button ref-button-outline" href="#shop-the-look">
              <PlayCircle /> Watch Lookbook
            </a>
          </div>
        </div>
      </section>

      <section
        className="ref-container feature-strip"
        aria-label="Store benefits"
      >
        {features.map(({ icon: Icon, title, text }) => (
          <article className="feature-card" data-reveal key={title}>
            <span className="feature-icon">
              <Icon />
            </span>
            <div>
              <h3>{title}</h3>
              <p>{text}</p>
            </div>
          </article>
        ))}
      </section>

      <section className="ref-section ref-container">
        <div className="ref-centered-heading">
          <h2>Explore Categories</h2>
          <p>Find your everyday favorites</p>
        </div>
        <div className="category-carousel">
          <button
            aria-label="Previous categories"
            onClick={() => scrollCategories(-1)}
          >
            <ArrowLeft />
          </button>
          <div className="category-track" ref={categoryTrack}>
            {categories.map(([name, image]) => (
              <Link
                className="round-category"
                data-reveal
                to={slug(name)}
                key={name}
              >
                <span>
                  <img src={`/image/${image}`} alt={name} />
                </span>
                {name}
              </Link>
            ))}
          </div>
          <button
            aria-label="Next categories"
            onClick={() => scrollCategories(1)}
          >
            <ArrowRight />
          </button>
        </div>
      </section>

      <section className="ref-section ref-container">
        <div className="ref-section-heading">
          <div>
            <span>FUTURE GRID</span>
            <h2>Find Your Perfect Style</h2>
          </div>
          <Link to="/shop">
            View All <ArrowRight />
          </Link>
        </div>
        <div className="style-grid">
          {styleCards.map(([name, image]) => (
            <Link
              className="style-card"
              data-reveal
              to="/shop/hijab"
              key={name}
            >
              <img src={`/image/${image}`} alt={name} />
              <span>
                <strong>{name}</strong>
                <small>
                  Explore Now <ArrowRight />
                </small>
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="ref-section ref-container promo-grid">
        <article className="promo-card" data-reveal>
          <div>
            <span>LIMITED TIME OFFER</span>
            <h2>Spring Sale Up to 50% Off</h2>
            <Link className="ref-button ref-button-dark" to="/shop">
              Shop The Sale <ArrowRight />
            </Link>
          </div>
          <img src="/image/promationimg.jpg" alt="Spring sale" />
        </article>
        <article className="promo-card" data-reveal>
          <div>
            <span>NEW ARRIVALS</span>
            <h2>Fresh Styles Just Landed</h2>
            <Link className="ref-button ref-button-dark" to="/new">
              Explore New In <ArrowRight />
            </Link>
          </div>
          <img src="/image/promotion img1.jpg" alt="Fresh styles" />
        </article>
      </section>

      <section className="ref-section ref-container">
        <div className="ref-section-heading">
          <div>
            <span>BEST SELLERS</span>
            <h2>Our Most Loved Picks</h2>
          </div>
          <Link to="/shop">
            View All Products <ArrowRight />
          </Link>
        </div>
        {loading ? (
          <div className="empty">
            <LoaderCircle className="loading-spinner" />
            <h2>Loading products</h2>
          </div>
        ) : error ? (
          <div className="empty">
            <h2>We couldn’t load products</h2>
            <p>{error}</p>
            <button className="ref-button ref-button-dark" onClick={retry}>
              Try again
            </button>
          </div>
        ) : (
          <div className="product-grid home-products">
            {products.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>

      <section className="lookbook" id="shop-the-look">
        <div className="ref-centered-heading">
          <h2>SHOP THE LOOK</h2>
        </div>
        <div className="look-grid">
          {looks.map((image, index) => (
            <Link
              to="/shop"
              className="look-card"
              data-reveal
              key={`${image}-${index}`}
            >
              <img src={`/image/${image}`} alt={`Momataz look ${index + 1}`} />
              <span>
                <Instagram />
                SHOP THIS LOOK
              </span>
            </Link>
          ))}
        </div>
        <a className="ref-button ref-button-border" href="#site-footer">
          Follow Us
        </a>
      </section>

      <section className="ref-container ref-newsletter" data-reveal>
        <img src="/image/chiffron.jpg" alt="Momataz chiffon collection" />
        <div>
          <span>GET 10% OFF YOUR FIRST ORDER</span>
          <h2>Join Our Style List</h2>
          <p>
            Sign up for exclusive offers, new arrivals, and style inspiration.
          </p>
          <form onSubmit={(event) => event.preventDefault()}>
            <label className="sr-only" htmlFor="home-email">
              Enter your email
            </label>
            <input
              id="home-email"
              required
              type="email"
              placeholder="Enter your email"
            />
            <button className="ref-button ref-button-dark">Subscribe</button>
          </form>
        </div>
      </section>
    </div>
  );
}
