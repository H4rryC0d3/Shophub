import { RefreshCw, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import '../styles/Returns.css';

export const ReturnsPage = () => {
  return (
    <div className="returns-page">
      <div className="returns-header">
        <RefreshCw size={64} className="returns-icon" />
        <h1 className="returns-title">Returns & Refunds Policy</h1>
        <p className="returns-subtitle">
          We want you to be completely satisfied with your purchase. 
          If you're not happy, we're here to help.
        </p>
      </div>

      {/* Quick Summary */}
      <div className="summary-grid">
        <div className="summary-card">
          <div className="summary-icon-wrapper summary-green">
            <CheckCircle className="summary-icon" size={32} />
          </div>
          <h3 className="summary-title">30-Day Returns</h3>
          <p className="summary-text">Return most items within 30 days</p>
        </div>
        
        <div className="summary-card">
          <div className="summary-icon-wrapper summary-blue">
            <RefreshCw className="summary-icon" size={32} />
          </div>
          <h3 className="summary-title">Easy Process</h3>
          <p className="summary-text">Simple online return requests</p>
        </div>
        
        <div className="summary-card">
          <div className="summary-icon-wrapper summary-purple">
            <CheckCircle className="summary-icon" size={32} />
          </div>
          <h3 className="summary-title">Quick Refunds</h3>
          <p className="summary-text">Processed within 5-7 days</p>
        </div>
      </div>

      {/* Return Policy Details */}
      <div className="policy-section">
        <h2 className="section-heading">Return Policy</h2>
        
        <div className="policy-content">
          <div className="policy-item">
            <h3 className="policy-subtitle">
              <CheckCircle className="subtitle-icon subtitle-green" size={20} />
              What Can Be Returned?
            </h3>
            <ul className="policy-list">
              <li>Most items can be returned within 30 days of delivery</li>
              <li>Items must be unused and in original packaging</li>
              <li>All tags and labels must be attached</li>
              <li>Items must be in the same condition as received</li>
            </ul>
          </div>

          <div className="policy-item">
            <h3 className="policy-subtitle">
              <XCircle className="subtitle-icon subtitle-red" size={20} />
              What Cannot Be Returned?
            </h3>
            <ul className="policy-list">
              <li>Perishable goods (food, flowers, etc.)</li>
              <li>Custom or personalized items</li>
              <li>Personal care items (cosmetics, hygiene products)</li>
              <li>Gift cards and downloadable products</li>
              <li>Items marked as "Final Sale"</li>
            </ul>
          </div>

          <div className="policy-item">
            <h3 className="policy-subtitle">
              <AlertCircle className="subtitle-icon subtitle-blue" size={20} />
              Return Conditions
            </h3>
            <ul className="policy-list">
              <li>Items must be returned within 30 days of delivery</li>
              <li>Original receipt or proof of purchase required</li>
              <li>Return shipping is free for defective items</li>
              <li>Customer pays return shipping for change of mind</li>
            </ul>
          </div>
        </div>
      </div>

      {/* How to Return */}
      <div className="steps-section">
        <h2 className="section-heading">How to Return an Item</h2>
        
        <div className="steps-list">
          <div className="step-item">
            <div className="step-number">1</div>
            <div className="step-content">
              <h4 className="step-title">Log into Your Account</h4>
              <p className="step-text">Go to your order history and select the item you want to return</p>
            </div>
          </div>

          <div className="step-item">
            <div className="step-number">2</div>
            <div className="step-content">
              <h4 className="step-title">Request a Return</h4>
              <p className="step-text">Click "Return Item" and select your reason for the return</p>
            </div>
          </div>

          <div className="step-item">
            <div className="step-number">3</div>
            <div className="step-content">
              <h4 className="step-title">Print Return Label</h4>
              <p className="step-text">We'll email you a prepaid return label to ship the item back</p>
            </div>
          </div>

          <div className="step-item">
            <div className="step-number">4</div>
            <div className="step-content">
              <h4 className="step-title">Ship the Item</h4>
              <p className="step-text">Package the item securely and drop it off at any carrier location</p>
            </div>
          </div>

          <div className="step-item">
            <div className="step-number">5</div>
            <div className="step-content">
              <h4 className="step-title">Receive Your Refund</h4>
              <p className="step-text">Once we receive your return, we'll process your refund within 5-7 business days</p>
            </div>
          </div>
        </div>
      </div>

      {/* Refund Information */}
      <div className="refund-section">
        <h2 className="refund-heading">Refund Information</h2>
        <ul className="refund-list">
          <li className="refund-item">
            <CheckCircle size={20} className="refund-icon" />
            <span>Refunds are issued to the original payment method</span>
          </li>
          <li className="refund-item">
            <CheckCircle size={20} className="refund-icon" />
            <span>Processing time: 5-7 business days after we receive your return</span>
          </li>
          <li className="refund-item">
            <CheckCircle size={20} className="refund-icon" />
            <span>Shipping costs are non-refundable unless the item is defective</span>
          </li>
          <li className="refund-item">
            <CheckCircle size={20} className="refund-icon" />
            <span>Original shipping costs will be deducted from your refund if applicable</span>
          </li>
        </ul>
      </div>
    </div>
  );
};