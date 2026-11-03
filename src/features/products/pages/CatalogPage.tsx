import {
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  Eye,
  Heart,
  LoaderCircle,
  Search,
  SlidersHorizontal,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { ProductCard } from "@/features/products/components/ProductCard";
import { useProducts } from "@/features/products/hooks/use-products";
import { categorySlug } from "@/features/products/services/product-service";
import type { Product } from "@/features/products/types/product";
import { useShopStore } from "@/stores/shop-store";
const labels: Record<string, string> = {
  "instant-hijab": "Instant Hijab",
  "prayer-hijab": "Prayer Hijab",
  "kid-hijab": "Kid Hijab",
};

function belongsToCollection(product: Product, collectionSlug: string) {
  return (
    categorySlug(product.category) === collectionSlug ||
    categorySlug(product.name) === collectionSlug
  );
}

export function CatalogPage({ newOnly = false }: { newOnly?: boolean }) {
  const { products, loading, error, retry } = useProducts();
  const { category } = useParams();
  const loc = useLocation();
  const query = new URLSearchParams(loc.search).get("q") ?? "";
  const [sort, setSort] = useState("featured");
  const [term, setTerm] = useState(query);
  const title = newOnly
    ? "New Arrivals"
    : category
      ? (labels[category] ?? category[0].toUpperCase() + category.slice(1))
      : "Shop All";
  const items = useMemo(() => {
    const x = products.filter(
      (p) =>
        (!newOnly || products.indexOf(p) < 8) &&
        (!category || belongsToCollection(p, category)) &&
        (!term ||
          `${p.name} ${p.category}`.toLowerCase().includes(term.toLowerCase())),
    );
    return [...x].sort((a, b) =>
      sort === "low"
        ? a.price - b.price
        : sort === "high"
          ? b.price - a.price
          : Number(b.featured) - Number(a.featured),
    );
  }, [category, newOnly, products, sort, term]);
  if (newOnly) {
    return (
      <NewArrivalsPage
        products={products}
        loading={loading}
        error={error}
        retry={retry}
      />
    );
  }
  const collection = category ? collectionPages[category] : undefined;
  if (collection) {
    return (
      <CollectionCatalogPage
        collection={collection}
        products={products}
        loading={loading}
        error={error}
        retry={retry}
      />
    );
  }
  return (
    <section className="catalog container page-space">
      <div className="page-intro">
        <span>THE MOMATAZ COLLECTION</span>
        <h1>{title}</h1>
        <p>
          Beautifully considered pieces for comfort, confidence, and everyday
          grace.
        </p>
      </div>
      <div className="catalog-tools">
        <label className="catalog-search">
          <Search size={17} />
          <span className="sr-only">Filter products</span>
          <input
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            placeholder="Search this collection"
          />
        </label>
        <label className="sort">
          <SlidersHorizontal size={17} />
          <span className="sr-only">Sort products</span>
          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="featured">Featured</option>
            <option value="low">Price: low to high</option>
            <option value="high">Price: high to low</option>
          </select>
        </label>
      </div>
      {loading ? (
        <div className="empty" role="status">
          <LoaderCircle className="loading-spinner" />
          <h2>Loading the collection</h2>
        </div>
      ) : error ? (
        <div className="empty" role="alert">
          <AlertCircle />
          <h2>We couldn’t load the collection</h2>
          <p>{error}</p>
          <button className="button" onClick={retry}>
            Try again
          </button>
        </div>
      ) : (
        <>
          <p className="result-count">
            {items.length} {items.length === 1 ? "style" : "styles"}
          </p>
          {items.length ? (
            <div className="product-grid">
              {items.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          ) : (
            <div className="empty">
              <Search />
              <h2>No pieces found</h2>
              <p>Try a different search term or explore another collection.</p>
              <button className="button" onClick={() => setTerm("")}>
                Clear search
              </button>
            </div>
          )}
        </>
      )}
    </section>
  );
}

const newCategories = [
  ["all", "All New In"],
  ["dresses", "Dresses"],
  ["hijab", "Hijab"],
  ["instant-hijab", "Instant Hijab"],
  ["prayer-hijab", "Prayer Hijab"],
  ["kid-hijab", "Kid Hijab"],
  ["accessories", "Accessories"],
] as const;
const newSlides = ["new1.jpg", "new2.png", "new3.jpg"] as const;

function NewArrivalsPage({
  products,
  loading,
  error,
  retry,
}: {
  products: Product[];
  loading: boolean;
  error: string | null;
  retry: () => void;
}) {
  const [slide, setSlide] = useState(0);
  const [sort, setSort] = useState("az");
  const [filter, setFilter] = useState("all");
  const [page, setPage] = useState(1);

  useEffect(() => {
    const timer = window.setInterval(
      () => setSlide((current) => (current + 1) % newSlides.length),
      5000,
    );
    return () => window.clearInterval(timer);
  }, []);

  const items = useMemo(() => {
    const filtered = products.filter(
      (product) =>
        filter === "all" || categorySlug(product.category) === filter,
    );
    return [...filtered].sort((a, b) => {
      if (sort === "low") return a.price - b.price;
      if (sort === "high") return b.price - a.price;
      if (sort === "new") return Number(b.id) - Number(a.id);
      return a.name.localeCompare(b.name);
    });
  }, [filter, products, sort]);

  const pageSize = 6;
  const pageCount = Math.max(1, Math.ceil(items.length / pageSize));
  const visibleItems = items.slice((page - 1) * pageSize, page * pageSize);
  const changeFilter = (value: string) => {
    setFilter(value);
    setPage(1);
  };

  return (
    <div className="new-arrivals-page">
      <section
        className="new-hero-carousel"
        aria-label="New collection highlights"
      >
        <div className="new-breadcrumb">
          <Link to="/">Home</Link>
          <span>|</span>
          <Link to="/new">News</Link>
        </div>
        {newSlides.map((image, index) => (
          <img
            className={index === slide ? "is-active" : ""}
            src={`/image/${image}`}
            alt={`Latest fashion news ${index + 1}`}
            key={image}
          />
        ))}
        <button
          className="new-slide-arrow previous"
          aria-label="Previous slide"
          onClick={() =>
            setSlide((slide - 1 + newSlides.length) % newSlides.length)
          }
        >
          <ChevronLeft />
        </button>
        <button
          className="new-slide-arrow next"
          aria-label="Next slide"
          onClick={() => setSlide((slide + 1) % newSlides.length)}
        >
          <ChevronRight />
        </button>
        <div className="new-slide-dots">
          {newSlides.map((image, index) => (
            <button
              className={index === slide ? "is-active" : ""}
              aria-label={`Show slide ${index + 1}`}
              onClick={() => setSlide(index)}
              key={image}
            />
          ))}
        </div>
      </section>

      <main className="new-catalog">
        <div className="new-toolbar">
          <label>
            <span>Sort by:</span>
            <select
              value={sort}
              onChange={(event) => {
                setSort(event.target.value);
                setPage(1);
              }}
            >
              <option value="az">Alphabetically, A-Z</option>
              <option value="low">Price, low to high</option>
              <option value="high">Price, high to low</option>
              <option value="new">Date, new to old</option>
            </select>
          </label>
          <label className="new-category-select">
            <span className="sr-only">Filter category</span>
            <select
              value={filter}
              onChange={(event) => changeFilter(event.target.value)}
            >
              {newCategories.map(([value, label]) => (
                <option value={value} key={value}>
                  {label}
                </option>
              ))}
            </select>
          </label>
        </div>

        <header className="new-catalog-heading">
          <span>JUST LANDED</span>
          <h1>New Arrivals</h1>
          <p>Discover the latest styles for your everyday elegance.</p>
        </header>

        {loading ? (
          <div className="empty" role="status">
            <LoaderCircle className="loading-spinner" />
            <h2>Loading the collection</h2>
          </div>
        ) : error ? (
          <div className="empty" role="alert">
            <AlertCircle />
            <h2>We couldn’t load the collection</h2>
            <p>{error}</p>
            <button className="ref-button ref-button-dark" onClick={retry}>
              Try again
            </button>
          </div>
        ) : visibleItems.length ? (
          <div className="new-product-grid">
            {visibleItems.map((product) => (
              <NewProductCard product={product} key={product.id} />
            ))}
          </div>
        ) : (
          <div className="empty">
            <Search />
            <h2>No new pieces found</h2>
            <p>Try another category to see more styles.</p>
            <button
              className="ref-button ref-button-dark"
              onClick={() => changeFilter("all")}
            >
              View all new arrivals
            </button>
          </div>
        )}

        {!loading && !error && items.length > 0 && (
          <nav className="new-pagination" aria-label="Product pages">
            {Array.from({ length: pageCount }, (_, index) => (
              <button
                className={page === index + 1 ? "is-active" : ""}
                onClick={() => setPage(index + 1)}
                aria-current={page === index + 1 ? "page" : undefined}
                key={index}
              >
                {index + 1}
              </button>
            ))}
            {page < pageCount && (
              <button
                aria-label="Next page"
                onClick={() =>
                  setPage((current) => Math.min(pageCount, current + 1))
                }
              >
                »
              </button>
            )}
          </nav>
        )}
      </main>
    </div>
  );
}

function NewProductCard({ product }: { product: Product }) {
  const toggleWishlist = useShopStore((state) => state.toggleWishlist);
  const wished = useShopStore((state) => state.wishlist.includes(product.id));
  return (
    <article className="new-product-card">
      <div className="new-product-image">
        <Link to={`/product/${product.slug}`}>
          <img src={product.image} alt={product.name} />
        </Link>
        <span>NEW</span>
        <button
          className={wished ? "is-active" : ""}
          aria-label={`${wished ? "Remove" : "Add"} ${product.name} ${wished ? "from" : "to"} wishlist`}
          onClick={() => toggleWishlist(product.id)}
        >
          <Heart />
        </button>
        <Link className="new-view-details" to={`/product/${product.slug}`}>
          <Eye /> View Details
        </Link>
      </div>
      <div className="new-product-info">
        <p>{product.category}</p>
        <h2>
          <Link to={`/product/${product.slug}`}>{product.name}</Link>
        </h2>
        <strong>${product.price.toFixed(2)}</strong>
      </div>
    </article>
  );
}

type CollectionPageConfig = {
  slug: string;
  name: string;
  hero: string;
  filters: readonly string[];
};
const collectionPages: Record<string, CollectionPageConfig> = {
  hijab: {
    slug: "hijab",
    name: "Hijab",
    hero: "hijab_img.jpg",
    filters: [
      "All",
      "Chiffon",
      "Chiffon Pleated",
      "Cotton",
      "Jersey",
      "Satin",
      "Printed Hijab",
      "Shimmer Scarf",
    ],
  },
  "instant-hijab": {
    slug: "instant-hijab",
    name: "Instant Hijab",
    hero: "Instant Hijab.jpg",
    filters: ["All", "Jersey", "Chiffon", "One Piece", "Two Piece"],
  },
  "prayer-hijab": {
    slug: "prayer-hijab",
    name: "Prayer Hijab",
    hero: "Prayer Hijab.jpg",
    filters: ["All", "Prayer Set", "Prayer Hijab", "Cotton", "Jersey"],
  },
  "kid-hijab": {
    slug: "kid-hijab",
    name: "Kid Hijab",
    hero: "Kids Hijab.jpg",
    filters: ["All", "Princess", "Star", "Cotton", "Jersey"],
  },
  apparel: {
    slug: "apparel",
    name: "Apparel",
    hero: "Apparel.jpg",
    filters: ["All", "Cardigan", "Pants", "Tops", "Skirts", "Sets"],
  },
  accessories: {
    slug: "accessories",
    name: "Accessories",
    hero: "bg.png",
    filters: ["All", "Undercap", "Pins", "Magnets", "Scrunchies"],
  },
};
const catalogLinks = [
  ["Home", "/"],
  ["News", "/new"],
  ["Dresses", "/shop/dresses"],
  ["Hijab", "/shop/hijab"],
  ["Instant Hijab", "/shop/instant-hijab"],
  ["Prayer Hijab", "/shop/prayer-hijab"],
  ["Kid Hijab", "/shop/kid-hijab"],
  ["Apparel", "/shop/apparel"],
  ["Accessories", "/shop/accessories"],
  ["Contact Us", "/contact"],
] as const;

function CollectionCatalogPage({
  collection,
  products,
  loading,
  error,
  retry,
}: {
  collection: CollectionPageConfig;
  products: Product[];
  loading: boolean;
  error: string | null;
  retry: () => void;
}) {
  const [sort, setSort] = useState("az");
  const [filter, setFilter] = useState("All");
  const [page, setPage] = useState(1);
  const collectionProducts = useMemo(() => {
    const categoryItems = products.filter((product) =>
      belongsToCollection(product, collection.slug),
    );
    const filtered =
      filter === "All"
        ? categoryItems
        : categoryItems.filter((product) =>
            `${product.name} ${product.description}`
              .toLowerCase()
              .includes(filter.toLowerCase()),
          );
    return [...filtered].sort((a, b) => {
      if (sort === "low") return a.price - b.price;
      if (sort === "high") return b.price - a.price;
      if (sort === "new") return Number(b.id) - Number(a.id);
      return a.name.localeCompare(b.name);
    });
  }, [collection.slug, filter, products, sort]);
  const pageSize = 6;
  const pageCount = Math.max(
    1,
    Math.ceil(collectionProducts.length / pageSize),
  );
  const visibleItems = collectionProducts.slice(
    (page - 1) * pageSize,
    page * pageSize,
  );

  return (
    <div className="hijab-catalog-page">
      <section
        className="hijab-page-hero"
        style={{
          backgroundImage: `linear-gradient(#0008, #0008), url("/image/${collection.hero}")`,
        }}
      >
        <div>
          <nav aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span>/</span>
            <strong>{collection.name}</strong>
          </nav>
          <h1>{collection.name} Collection</h1>
        </div>
      </section>
      <main className="hijab-catalog-main">
        <div className="hijab-sortbar">
          <label>
            <span>Sort by:</span>
            <select
              value={sort}
              onChange={(event) => {
                setSort(event.target.value);
                setPage(1);
              }}
            >
              <option value="az">Alphabetically, A-Z</option>
              <option value="low">Price, low to high</option>
              <option value="high">Price, high to low</option>
              <option value="new">Date, new to old</option>
            </select>
          </label>
        </div>
        <h2 className="hijab-list-title">{collection.name}</h2>
        <div className="hijab-layout">
          <aside className="hijab-sidebar">
            <section>
              <h3>MAIN MENU</h3>
              <nav>
                {catalogLinks.map(([label, to]) => (
                  <Link
                    className={label === collection.name ? "is-active" : ""}
                    to={to}
                    key={label}
                  >
                    {label}
                  </Link>
                ))}
              </nav>
            </section>
            <section>
              <h3>FILTER PRODUCTS</h3>
              <div className="hijab-filter-pills">
                {collection.filters.map((label) => (
                  <button
                    className={filter === label ? "is-active" : ""}
                    onClick={() => {
                      setFilter(label);
                      setPage(1);
                    }}
                    key={label}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </section>
          </aside>
          <section className="hijab-results" aria-live="polite">
            {loading ? (
              <div className="empty" role="status">
                <LoaderCircle className="loading-spinner" />
                <h2>Loading {collection.name.toLowerCase()}</h2>
              </div>
            ) : error ? (
              <div className="empty" role="alert">
                <AlertCircle />
                <h2>We couldn’t load the collection</h2>
                <p>{error}</p>
                <button className="ref-button ref-button-dark" onClick={retry}>
                  Try again
                </button>
              </div>
            ) : visibleItems.length ? (
              <div className="hijab-product-grid">
                {visibleItems.map((product) => (
                  <HijabProductCard product={product} key={product.id} />
                ))}
              </div>
            ) : (
              <div className="empty">
                <Search />
                <h2>No {collection.name.toLowerCase()} products found</h2>
                <p>Try a different product filter.</p>
                <button
                  className="ref-button ref-button-dark"
                  onClick={() => setFilter("All")}
                >
                  Clear filter
                </button>
              </div>
            )}
            {!loading && !error && collectionProducts.length > 0 && (
              <nav className="new-pagination" aria-label="Product pages">
                {Array.from({ length: pageCount }, (_, index) => (
                  <button
                    className={page === index + 1 ? "is-active" : ""}
                    onClick={() => setPage(index + 1)}
                    aria-current={page === index + 1 ? "page" : undefined}
                    key={index}
                  >
                    {index + 1}
                  </button>
                ))}
                {page < pageCount && (
                  <button
                    aria-label="Next page"
                    onClick={() =>
                      setPage((current) => Math.min(pageCount, current + 1))
                    }
                  >
                    »
                  </button>
                )}
              </nav>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}

function HijabProductCard({ product }: { product: Product }) {
  const toggleWishlist = useShopStore((state) => state.toggleWishlist);
  const wished = useShopStore((state) => state.wishlist.includes(product.id));
  return (
    <article className="hijab-product-item">
      <div className="hijab-product-card">
        <Link className="hijab-product-photo" to={`/product/${product.slug}`}>
          <img src={product.image} alt={product.name} />
        </Link>
        <button
          className={`hijab-wish ${wished ? "is-active" : ""}`}
          onClick={() => toggleWishlist(product.id)}
          aria-label={`${wished ? "Remove" : "Add"} ${product.name} ${wished ? "from" : "to"} wishlist`}
        >
          <Heart />
        </button>
        <Link className="hijab-quick-view" to={`/product/${product.slug}`}>
          <Eye /> Quick View
        </Link>
      </div>
      <div className="hijab-product-info">
        <h3>
          <Link to={`/product/${product.slug}`}>{product.name}</Link>
        </h3>
        <strong>${product.price.toFixed(2)}</strong>
      </div>
    </article>
  );
}
