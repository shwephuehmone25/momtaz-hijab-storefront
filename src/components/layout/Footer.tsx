import { Instagram, Mail, MapPin, Phone } from "lucide-react";
import { Link } from "react-router-dom";
export function Footer() {
  return (
    <footer>
      <div className="container footer-grid">
        <div>
          <Link to="/" className="brand footer-brand">
            MOMATAZ
          </Link>
          <p>
            Graceful essentials, thoughtfully designed for the rhythm of modern
            life.
          </p>
          <a className="social" href="#instagram" aria-label="Instagram">
            <Instagram size={18} />
          </a>
        </div>
        <div>
          <h3>Shop</h3>
          <Link to="/new">New arrivals</Link>
          <Link to="/shop/hijab">Hijab</Link>
          <Link to="/shop/dresses">Dresses</Link>
          <Link to="/shop/accessories">Accessories</Link>
        </div>
        <div>
          <h3>Customer care</h3>
          <Link to="/contact">Contact us</Link>
          <Link to="/account">My account</Link>
          <Link to="/cart">Shopping bag</Link>
          <a href="#shipping">Shipping & returns</a>
        </div>
        <div>
          <h3>Visit & connect</h3>
          <p>
            <MapPin size={16} />
            51–60 Van Kleeck St, Elmhurst, NY 11373
          </p>
          <a href="tel:7189262773">
            <Phone size={16} />
            718-926-2773
          </a>
          <a href="mailto:momtazhijab@gmail.com">
            <Mail size={16} />
            momtazhijab@gmail.com
          </a>
        </div>
      </div>
      <div className="footer-bottom container">
        <span>© 2026 Momataz Hijab</span>
        <span>Frontend demonstration — no real payments or orders</span>
      </div>
    </footer>
  );
}
