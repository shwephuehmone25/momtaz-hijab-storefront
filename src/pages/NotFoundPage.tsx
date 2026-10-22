import { Link } from "react-router-dom";
export function NotFoundPage() {
  return (
    <section className="empty page-space">
      <span className="eyebrow">404</span>
      <h1>This page slipped away</h1>
      <p>Let’s bring you back to the collection.</p>
      <Link className="button" to="/">
        Return home
      </Link>
    </section>
  );
}
