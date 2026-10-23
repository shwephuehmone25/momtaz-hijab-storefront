import {
  Apple,
  Circle,
  Compass,
  CreditCard,
  Facebook,
  Instagram,
  Mail,
  MapPin,
  Music2,
  Phone,
} from "lucide-react";
import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer id="site-footer" className="reference-footer">
      <div className="ref-container">
        <div className="reference-footer-grid">
          <section
            className="reference-footer-brand"
            aria-labelledby="footer-brand-title"
          >
            <h2 id="footer-brand-title">MOMTAZ HIJAB</h2>
            <p>Timeless fashion for every moment. Designed with you in mind.</p>
            <div className="reference-footer-socials">
              <a href="#instagram" title="Instagram" aria-label="Instagram">
                <Instagram />
              </a>
              <a href="#facebook" title="Facebook" aria-label="Facebook">
                <Facebook />
              </a>
              <a href="#pinterest" title="Pinterest" aria-label="Pinterest">
                <strong>P</strong>
              </a>
              <a href="#tiktok" title="TikTok" aria-label="TikTok">
                <Music2 />
              </a>
            </div>
          </section>

          <nav aria-labelledby="footer-shop-title">
            <h3 id="footer-shop-title">SHOP</h3>
            <ul>
              <li>
                <Link to="/shop">All Products</Link>
              </li>
              <li>
                <Link to="/new">New Arrivals</Link>
              </li>
              <li>
                <Link to="/shop/chiffon">Chiffon</Link>
              </li>
              <li>
                <Link to="/shop/hijab">Hijab</Link>
              </li>
              <li>
                <Link to="/shop/apparel">Apparel</Link>
              </li>
            </ul>
          </nav>

          <nav aria-labelledby="footer-care-title">
            <h3 id="footer-care-title">CUSTOMER CARE</h3>
            <ul>
              <li>
                <Link to="/contact">Contact Us</Link>
              </li>
              <li>
                <a href="#shipping">Shipping &amp; Delivery</a>
              </li>
              <li>
                <a href="#returns">Returns &amp; Exchanges</a>
              </li>
              <li>
                <a href="#size-guide">Size Guide</a>
              </li>
              <li>
                <a href="#faqs">FAQs</a>
              </li>
            </ul>
          </nav>

          <section aria-labelledby="footer-contact-title">
            <h3 id="footer-contact-title">GET IN TOUCH</h3>
            <ul className="reference-footer-contact">
              <li>
                <MapPin />
                <span>51-60 Vankleeck Street Elmhurst, NY 11373</span>
              </li>
              <li>
                <Phone />
                <a href="tel:7189262773">718-926-2773</a>
              </li>
              <li>
                <Mail />
                <a href="mailto:momtazhijab@gmail.com">momtazhijab@gmail.com</a>
              </li>
            </ul>
          </section>
        </div>

        <section className="payment-section" aria-label="Accepted payments">
          <p>Accepted Payments</p>
          <div className="payment-badges">
            <span>
              <CreditCard className="amex-icon" />
              <strong>AMEX</strong>
            </span>
            <span>
              <Apple />
              <strong>Pay</strong>
            </span>
            <span>
              <CreditCard className="diners-icon" />
              <strong>Diners</strong>
            </span>
            <span>
              <Compass className="discover-icon" />
              <strong>DISCOVER</strong>
            </span>
            <span>
              <strong className="google-g">G</strong>
              <strong>Pay</strong>
            </span>
            <span className="mastercard">
              <i>
                <Circle />
                <Circle />
              </i>
              <strong>Mastercard</strong>
            </span>
            <span className="shop-pay">
              <strong>shop Pay</strong>
            </span>
            <span className="visa">
              <strong>VISA</strong>
            </span>
          </div>
        </section>

        <div className="reference-footer-bottom">
          <p>© 2026 LUNORA Fashion. All Rights Reserved.</p>
          <div>
            <a href="#privacy">Privacy Policy</a>
            <a href="#terms">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
