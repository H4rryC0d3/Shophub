import {
  Facebook,
  Twitter,
  Instagram,
  Phone,
  Mail,
  MapPin
} from "lucide-react";
import '../styles/Footer.css';

const Footer = ({ setCurrentPage }) => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-grid">
          {/* Brand Section */}
          <div className="footer-brand">
            <h2 className="brand-title">Harry’s Store</h2>
            <p className="brand-description">
              Your one-stop destination for quality products at great prices.
            </p>
            <div className="social-links">
              <a href="#" className="social-icon" aria-label="Facebook">
                <Facebook className="icon" />
              </a>
              <a href="#" className="social-icon" aria-label="Twitter">
                <Twitter className="icon" />
              </a>
              <a href="#" className="social-icon" aria-label="Instagram">
                <Instagram className="icon" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-section">
            <h3 className="section-title">Quick Links</h3>
            <ul className="footer-links">
              <li>
                <button onClick={() => setCurrentPage('home')}>
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('about')}>
                  About Us
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('shop')}>
                  Shop
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('contact')}>
                  Contact
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('faq')}>
                  FAQ
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('shipping')}>
                  Shipping Info
                </button>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div className="footer-section">
            <h3 className="section-title">Customer Service</h3>
            <ul className="footer-links">
              <li>
                <button onClick={() => setCurrentPage('returns')}>
                  Returns
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('track-order')}>
                  Track Order
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('privacy')}>
                  Privacy Policy
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('terms')}>
                  Terms of Service
                </button>
              </li>
            </ul>
          </div>

           {/* Contact Info */}
          <div className="footer-section">
            <h3 className="section-title">Contact Info</h3>
            <ul className="contact-info">
              <li className="contact-item">
                <Phone className="contact-icon" />
                <span>+91 98765 43210</span>
              </li>
              <li className="contact-item">
                <Mail className="contact-icon" />
                <span>support@HarryStore.com</span>
              </li>
              <li className="contact-item">
                <MapPin className="contact-icon" />
                <span>123 MG Road, Hyderabad 500034</span>
              </li>
            </ul>
          </div>
        </div>
        {/* Bottom Bar */}
        <div className="footer-bottom">
          <p>© 2024 Harry’s Store. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;