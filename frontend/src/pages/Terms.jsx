import { FileText, AlertTriangle, Scale, CheckCircle } from 'lucide-react';
import '../styles/Terms.css';

export const TermsPage = () => {
  return (
    <div className="terms-page">
      <div className="terms-header">
        <FileText size={64} className="terms-icon" />
        <h1 className="terms-title">Terms of Service</h1>
        <p className="terms-date">
          Last updated: December 22, 2024
        </p>
      </div>

      {/* Introduction */}
      <div className="terms-section">
        <h2 className="section-heading">Agreement to Terms</h2>
        <p className="section-text">
          Welcome to Harry’s Store. By accessing or using our website, you agree to be bound by these 
          Terms of Service and all applicable laws and regulations. If you do not agree with any 
          of these terms, you are prohibited from using or accessing this site.
        </p>
        <div className="important-notice">
          <p>
            <strong>Important:</strong> Please read these terms carefully before using our services.
          </p>
        </div>
      </div>

      {/* Account Terms */}
      <div className="terms-section">
        <h2 className="section-heading">
          <CheckCircle size={28} className="heading-icon heading-green" />
          Account Terms
        </h2>
        
        <ul className="terms-list">
          <li className="list-item">
            <span className="bullet-blue">•</span>
            <span>You must be 18 years or older to create an account and make purchases</span>
          </li>
          <li className="list-item">
            <span className="bullet-blue">•</span>
            <span>You are responsible for maintaining the security of your account credentials</span>
          </li>
          <li className="list-item">
            <span className="bullet-blue">•</span>
            <span>You must provide accurate and complete information when creating an account</span>
          </li>
          <li className="list-item">
            <span className="bullet-blue">•</span>
            <span>One person or legal entity may maintain only one account</span>
          </li>
          <li className="list-item">
            <span className="bullet-blue">•</span>
            <span>You are responsible for all activity that occurs under your account</span>
          </li>
          <li className="list-item">
            <span className="bullet-blue">•</span>
            <span>We reserve the right to refuse service or terminate accounts at our discretion</span>
          </li>
        </ul>
      </div>

      {/* Use of Service */}
      <div className="terms-section">
        <h2 className="section-heading">Acceptable Use</h2>
        
        <p className="section-text">You agree NOT to:</p>
        
        <ul className="terms-list">
          <li className="list-item">
            <span className="bullet-red">✗</span>
            <span>Use the service for any illegal purpose or violate any laws</span>
          </li>
          <li className="list-item">
            <span className="bullet-red">✗</span>
            <span>Transmit any viruses, malware, or harmful code</span>
          </li>
          <li className="list-item">
            <span className="bullet-red">✗</span>
            <span>Attempt to gain unauthorized access to our systems</span>
          </li>
          <li className="list-item">
            <span className="bullet-red">✗</span>
            <span>Impersonate another person or entity</span>
          </li>
          <li className="list-item">
            <span className="bullet-red">✗</span>
            <span>Harass, abuse, or harm other users</span>
          </li>
          <li className="list-item">
            <span className="bullet-red">✗</span>
            <span>Use automated systems to access the service without permission</span>
          </li>
        </ul>
      </div>

      {/* Products and Pricing */}
      <div className="terms-section">
        <h2 className="section-heading">Products and Pricing</h2>
        
        <div className="content-blocks">
          <p className="content-block">
            <strong>Product Availability:</strong> All products are subject to availability. 
            We reserve the right to discontinue any product at any time.
          </p>
          <p className="content-block">
            <strong>Pricing:</strong> Prices are subject to change without notice. We strive 
            to provide accurate pricing information but errors may occur. If a product is 
            listed at an incorrect price, we reserve the right to cancel the order.
          </p>
          <p className="content-block">
            <strong>Product Descriptions:</strong> We attempt to be as accurate as possible. 
            However, we do not warrant that product descriptions or other content is accurate, 
            complete, reliable, current, or error-free.
          </p>
        </div>
      </div>

      {/* Orders and Payment */}
      <div className="terms-section">
        <h2 className="section-heading">Orders and Payment</h2>
        
        <ul className="terms-list">
          <li className="list-item">
            <span className="arrow-blue">→</span>
            <span>Orders are subject to acceptance and availability</span>
          </li>
          <li className="list-item">
            <span className="arrow-blue">→</span>
            <span>We reserve the right to refuse or cancel any order</span>
          </li>
          <li className="list-item">
            <span className="arrow-blue">→</span>
            <span>Payment is due at the time of purchase</span>
          </li>
          <li className="list-item">
            <span className="arrow-blue">→</span>
            <span>All prices are in USD unless otherwise specified</span>
          </li>
          <li className="list-item">
            <span className="arrow-blue">→</span>
            <span>You are responsible for all charges incurred under your account</span>
          </li>
        </ul>
      </div>

      {/* Intellectual Property */}
      <div className="terms-section">
        <h2 className="section-heading">
          <Scale size={28} className="heading-icon heading-purple" />
          Intellectual Property
        </h2>
        
        <p className="section-text">
          The Service and its original content, features, and functionality are owned by Harry’s Store
          and are protected by international copyright, trademark, patent, trade secret, and other 
          intellectual property laws.
        </p>
        <p className="section-text">
          You may not reproduce, distribute, modify, create derivative works of, publicly display, 
          or publicly perform any of our content without our express written permission.
        </p>
      </div>

      {/* Limitation of Liability */}
      <div className="terms-section">
        <h2 className="section-heading">
          <AlertTriangle size={28} className="heading-icon heading-yellow" />
          Limitation of Liability
        </h2>
        
        <p className="section-text">
          To the maximum extent permitted by law, Harry’s Store shall not be liable for any indirect, 
          incidental, special, consequential, or punitive damages, or any loss of profits or revenues, 
          whether incurred directly or indirectly, or any loss of data, use, goodwill, or other 
          intangible losses.
        </p>
        <div className="warning-notice">
          <p>
            Some jurisdictions do not allow the exclusion of certain warranties or the limitation 
            of liability. In such cases, our liability will be limited to the maximum extent 
            permitted by law.
          </p>
        </div>
      </div>

      {/* Warranty Disclaimer */}
      <div className="terms-section">
        <h2 className="section-heading">Warranty Disclaimer</h2>
        
        <p className="section-text">
          THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, 
          WHETHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF 
          MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, OR NON-INFRINGEMENT.
        </p>
        <p className="section-text">
          We do not warrant that the service will be uninterrupted, secure, or error-free, 
          or that defects will be corrected.
        </p>
      </div>

      {/* Modifications */}
      <div className="terms-section">
        <h2 className="section-heading">Changes to Terms</h2>
        
        <p className="section-text">
          We reserve the right to modify or replace these Terms at any time. If a revision is 
          material, we will provide at least 30 days' notice prior to any new terms taking effect. 
          What constitutes a material change will be determined at our sole discretion. Continued 
          use of the service after changes become effective constitutes acceptance of the new Terms.
        </p>
      </div>

      {/* Governing Law */}
      <div className="terms-section">
        <h2 className="section-heading">Governing Law</h2>
        
        <p className="section-text">
          These Terms shall be governed by and construed in accordance with the laws of the 
          State of New York, United States, without regard to its conflict of law provisions. 
          Any disputes arising from these Terms will be resolved in the courts of New York County, 
          New York.
        </p>
      </div>

      {/* Contact */}
      <div className="contact-section">
        <h2 className="contact-heading">Questions About Our Terms?</h2>
        <p className="contact-intro">
          If you have any questions about these Terms of Service, please contact us:
        </p>
        <ul className="contact-list">
          <li>Email: legal@HarryStore.com</li>
          <li>Phone: +1 (555) 123-4567</li>
          <li>Address: 123 Shop Street, New York, NY 10001</li>
        </ul>
      </div>
    </div>
  );
};