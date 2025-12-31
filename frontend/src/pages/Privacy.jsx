import { Shield, Lock, Eye, FileText, AlertCircle } from 'lucide-react';
import '../styles/Privacy.css';

export const PrivacyPage = () => {
  return (
    <div className="privacy-page">
      <div className="privacy-header">
        <Shield size={64} className="privacy-icon" />
        <h1 className="privacy-title">Privacy Policy</h1>
        <p className="privacy-date">
          Last updated: December 22, 2024
        </p>
      </div>

      {/* Introduction */}
      <div className="privacy-intro">
        <p className="intro-text">
          At Harry’s Store, we take your privacy seriously. This Privacy Policy explains how we collect, 
          use, disclose, and safeguard your information when you visit our website and use our services.
        </p>
        <p className="intro-text">
          Please read this privacy policy carefully. If you do not agree with the terms of this 
          privacy policy, please do not access the site.
        </p>
      </div>

      {/* Quick Overview */}
      <div className="overview-grid">
        <div className="overview-card overview-secure">
          <Lock size={32} className="overview-icon" />
          <h3 className="overview-title">Your Data is Secure</h3>
          <p className="overview-text">
            We use industry-standard encryption and security measures to protect your personal information.
          </p>
        </div>
        <div className="overview-card overview-transparent">
          <Eye size={32} className="overview-icon" />
          <h3 className="overview-title">Transparent Practices</h3>
          <p className="overview-text">
            We're open about what data we collect and how we use it to improve your experience.
          </p>
        </div>
      </div>

      {/* Information We Collect */}
      <div className="privacy-section">
        <h2 className="section-heading">
          <FileText size={28} />
          Information We Collect
        </h2>
        
        <div className="section-content">
          <div className="subsection">
            <h3 className="subsection-title">Personal Information</h3>
            <p className="subsection-text">
              When you register or make a purchase, we may collect:
            </p>
            <ul className="info-list">
              <li>Name and contact information (email, phone, address)</li>
              <li>Payment information (credit card details)</li>
              <li>Account credentials (username, password)</li>
              <li>Purchase history and preferences</li>
            </ul>
          </div>

          <div className="subsection">
            <h3 className="subsection-title">Automatically Collected Information</h3>
            <p className="subsection-text">
              When you visit our website, we automatically collect:
            </p>
            <ul className="info-list">
              <li>IP address and browser type</li>
              <li>Device information and operating system</li>
              <li>Browsing patterns and pages visited</li>
              <li>Cookies and similar tracking technologies</li>
            </ul>
          </div>
        </div>
      </div>

      {/* How We Use Your Information */}
      <div className="privacy-section">
        <h2 className="section-heading">How We Use Your Information</h2>
        
        <ul className="bullet-list">
          <li className="bullet-item">
            <span className="bullet-icon">•</span>
            <span>Process your orders and manage your account</span>
          </li>
          <li className="bullet-item">
            <span className="bullet-icon">•</span>
            <span>Send order confirmations and shipping updates</span>
          </li>
          <li className="bullet-item">
            <span className="bullet-icon">•</span>
            <span>Provide customer support and respond to inquiries</span>
          </li>
          <li className="bullet-item">
            <span className="bullet-icon">•</span>
            <span>Personalize your shopping experience</span>
          </li>
          <li className="bullet-item">
            <span className="bullet-icon">•</span>
            <span>Send promotional emails (with your consent)</span>
          </li>
          <li className="bullet-item">
            <span className="bullet-icon">•</span>
            <span>Improve our website and services</span>
          </li>
          <li className="bullet-item">
            <span className="bullet-icon">•</span>
            <span>Prevent fraud and ensure security</span>
          </li>
        </ul>
      </div>

      {/* Information Sharing */}
      <div className="privacy-section">
        <h2 className="section-heading">Information Sharing</h2>
        
        <p className="section-intro">
          We do not sell, trade, or rent your personal information to third parties. 
          We may share your information with:
        </p>
        
        <div className="sharing-content">
          <div className="sharing-item">
            <h3 className="sharing-title">Service Providers</h3>
            <p className="sharing-text">
              Payment processors, shipping companies, and other trusted partners who help us 
              operate our business.
            </p>
          </div>
          <div className="sharing-item">
            <h3 className="sharing-title">Legal Requirements</h3>
            <p className="sharing-text">
              When required by law or to protect our rights, property, or safety.
            </p>
          </div>
          <div className="sharing-item">
            <h3 className="sharing-title">Business Transfers</h3>
            <p className="sharing-text">
              In connection with a merger, acquisition, or sale of assets.
            </p>
          </div>
        </div>
      </div>

      {/* Your Rights */}
      <div className="privacy-section">
        <h2 className="section-heading">Your Privacy Rights</h2>
        
        <ul className="rights-list">
          <li className="rights-item">
            <span className="check-icon">✓</span>
            <span><strong>Access:</strong> Request a copy of your personal data</span>
          </li>
          <li className="rights-item">
            <span className="check-icon">✓</span>
            <span><strong>Correction:</strong> Update or correct inaccurate information</span>
          </li>
          <li className="rights-item">
            <span className="check-icon">✓</span>
            <span><strong>Deletion:</strong> Request deletion of your personal data</span>
          </li>
          <li className="rights-item">
            <span className="check-icon">✓</span>
            <span><strong>Opt-out:</strong> Unsubscribe from marketing communications</span>
          </li>
          <li className="rights-item">
            <span className="check-icon">✓</span>
            <span><strong>Data Portability:</strong> Receive your data in a portable format</span>
          </li>
        </ul>
      </div>

      {/* Cookies */}
      <div className="privacy-section">
        <h2 className="section-heading">Cookies and Tracking</h2>
        
        <p className="section-intro">
          We use cookies and similar technologies to enhance your experience. You can control 
          cookie preferences through your browser settings.
        </p>
        
        <div className="cookies-box">
          <h3 className="cookies-title">Types of Cookies We Use:</h3>
          <ul className="cookies-list">
            <li>• <strong>Essential:</strong> Required for website functionality</li>
            <li>• <strong>Performance:</strong> Help us improve website performance</li>
            <li>• <strong>Functional:</strong> Remember your preferences</li>
            <li>• <strong>Marketing:</strong> Used for targeted advertising</li>
          </ul>
        </div>
      </div>

      {/* Security */}
      <div className="privacy-section">
        <h2 className="section-heading">
          <Lock size={28} />
          Data Security
        </h2>
        
        <p className="section-intro">
          We implement appropriate technical and organizational security measures to protect 
          your personal information, including:
        </p>
        
        <ul className="security-list">
          <li>SSL/TLS encryption for data transmission</li>
          <li>Secure server infrastructure</li>
          <li>Regular security audits and updates</li>
          <li>Access controls and authentication</li>
          <li>Employee training on data protection</li>
        </ul>
      </div>

      {/* Contact */}
      <div className="contact-section">
        <h2 className="contact-heading">
          <AlertCircle size={28} />
          Questions About Privacy?
        </h2>
        <p className="contact-intro">
          If you have questions or concerns about our privacy practices, please contact us:
        </p>
        <ul className="contact-list">
          <li>Email: privacy@HarryStore.com</li>
          <li>Phone: +1 (555) 123-4567</li>
          <li>Address: 123 Shop Street, New York, NY 10001</li>
        </ul>
      </div>
    </div>
  );
};