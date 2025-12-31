import { Truck, MapPin, Clock, Globe, IndianRupee } from 'lucide-react';
import '../styles/Shipping.css';

export const ShippingPage = () => {
  return (
    <div className="shipping-page">
      <div className="shipping-header">
        <Truck size={64} className="shipping-icon" />
        <h1 className="shipping-title">Shipping Information</h1>
        <p className="shipping-subtitle">
          Fast, reliable shipping to your doorstep. Learn about our shipping options, 
          rates, and delivery times.
        </p>
      </div>

      {/* Shipping Options */}
      <div className="shipping-options-grid">
        <div className="option-card">
          <div className="option-icon-wrapper option-blue">
            <Truck className="option-icon" size={32} />
          </div>
          <h3 className="option-title">Standard Shipping</h3>
          <p className="option-time">5-7 Business Days</p>
          <p className="option-price">FREE</p>
          <p className="option-note">On orders over ₹4,150</p>
        </div>

        <div className="option-card option-popular">
          <div className="popular-badge">Popular</div>
          <div className="option-icon-wrapper option-purple">
            <Truck className="option-icon" size={32} />
          </div>
          <h3 className="option-title">Express Shipping</h3>
          <p className="option-time">2-3 Business Days</p>
          <p className="option-price option-price-purple">₹1,079</p>
          <p className="option-note">All orders</p>
        </div>

        <div className="option-card">
          <div className="option-icon-wrapper option-green">
            <Truck className="option-icon" size={32} />
          </div>
          <h3 className="option-title">Next Day</h3>
          <p className="option-time">1 Business Day</p>
          <p className="option-price option-price-green">₹2,074</p>
          <p className="option-note">Order by 2 PM</p>
        </div>
      </div>

      {/* Shipping Rates Table */}
      <div className="rates-section">
        <h2 className="section-heading">
          <IndianRupee size={28} />
          Domestic Shipping Rates
        </h2>
        <div className="table-container">
          <table className="rates-table">
            <thead>
              <tr>
                <th>Order Value</th>
                <th>Standard</th>
                <th>Express</th>
                <th>Next Day</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Under ₹4,150</td>
                <td>₹497</td>
                <td>₹1,079</td>
                <td>₹2,074</td>
              </tr>
              <tr className="highlight-row">
                <td className="bold-cell">₹4,150 - ₹8,300</td>
                <td className="free-cell">FREE</td>
                <td>₹1,079</td>
                <td>₹2,074</td>
              </tr>
              <tr className="highlight-row">
                <td className="bold-cell">Over ₹8,300</td>
                <td className="free-cell">FREE</td>
                <td className="free-cell">FREE</td>
                <td>₹2,074</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* International Shipping */}
      <div className="international-section">
        <h2 className="section-heading">
          <Globe size={28} />
          International Shipping
        </h2>
        <p className="international-intro">
          We ship to over 50 countries worldwide. International shipping rates and delivery 
          times vary by destination.
        </p>
        
        <div className="regions-grid">
          <div className="region-card">
            <h3 className="region-title">Canada</h3>
            <ul className="region-rates">
              <li className="rate-item">
                <span>Standard (7-10 days)</span>
                <span className="rate-price">₹1,327</span>
              </li>
              <li className="rate-item">
                <span>Express (3-5 days)</span>
                <span className="rate-price">₹2,489</span>
              </li>
            </ul>
          </div>

          <div className="region-card">
            <h3 className="region-title">Europe</h3>
            <ul className="region-rates">
              <li className="rate-item">
                <span>Standard (10-15 days)</span>
                <span className="rate-price">₹2,156</span>
              </li>
              <li className="rate-item">
                <span>Express (5-7 days)</span>
                <span className="rate-price">₹3,814</span>
              </li>
            </ul>
          </div>

          <div className="region-card">
            <h3 className="region-title">Asia & Australia</h3>
            <ul className="region-rates">
              <li className="rate-item">
                <span>Standard (12-18 days)</span>
                <span className="rate-price">₹2,489</span>
              </li>
              <li className="rate-item">
                <span>Express (6-10 days)</span>
                <span className="rate-price">₹4,647</span>
              </li>
            </ul>
          </div>

          <div className="region-card">
            <h3 className="region-title">Rest of World</h3>
            <ul className="region-rates">
              <li className="rate-item">
                <span>Standard (15-25 days)</span>
                <span className="rate-price">₹2,987</span>
              </li>
              <li className="rate-item">
                <span>Express (8-12 days)</span>
                <span className="rate-price">₹5,477</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Processing Time */}
      <div className="processing-section">
        <h2 className="section-heading">
          <Clock size={28} />
          Order Processing
        </h2>
        <div className="processing-content">
          <p>
            Orders are processed Monday through Friday, excluding holidays. Orders placed 
            after 2:00 PM EST will be processed the next business day.
          </p>
          <ul className="processing-list">
            <li>Standard orders: 1-2 business days processing</li>
            <li>Express orders: Same day processing (if ordered before 2 PM EST)</li>
            <li>Next day orders: Same day processing (if ordered before 2 PM EST)</li>
            <li>Custom/personalized items: 3-5 business days processing</li>
          </ul>
          <p className="tracking-notice">
            You'll receive a tracking number via email once your order ships!
          </p>
        </div>
      </div>

      {/* Delivery Information */}
      <div className="delivery-section">
        <h2 className="section-heading">
          <MapPin size={28} />
          Delivery Information
        </h2>
        <div className="delivery-grid">
          <div>
            <h3 className="subsection-title">Delivery Options</h3>
            <ul className="delivery-list">
              <li>• Signature required for orders over ₹41,500</li>
              <li>• Leave at door (default)</li>
              <li>• Leave with neighbor (optional)</li>
              <li>• Hold at carrier facility (available on request)</li>
            </ul>
          </div>
          <div>
            <h3 className="subsection-title">Important Notes</h3>
            <ul className="delivery-list">
              <li>• PO Box addresses accepted for standard shipping only</li>
              <li>• APO/FPO addresses available</li>
              <li>• Multiple addresses per order not supported</li>
              <li>• Address changes must be made before shipping</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Shipping Restrictions */}
      <div className="restrictions-section">
        <h3 className="restrictions-title">
          <Clock className="restrictions-icon" size={24} />
          Shipping Restrictions
        </h3>
        <ul className="restrictions-list">
          <li>• Some items cannot be shipped internationally due to customs regulations</li>
          <li>• Hazardous materials and perishables have special shipping requirements</li>
          <li>• Large or oversized items may require freight shipping (additional fees apply)</li>
          <li>• International orders may be subject to customs fees and import duties</li>
        </ul>
      </div>
    </div>
  );
};