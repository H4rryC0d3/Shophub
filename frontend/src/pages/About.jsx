import { Award, TrendingUp, Heart, Users, Target, Zap } from 'lucide-react';
import '../styles/About.css';

export const AboutPage = () => {
  return (
    <div className="about-page">
      <h1 className="about-title">About Harry’s Store</h1>
      
      {/* Main Story */}
      <div className="story-section">
        <h2 className="section-heading">Our Story</h2>
        <p className="story-text">
          Founded in 2024, ShopHub has been committed to providing customers with high-quality products 
          at competitive prices. We believe in making online shopping simple, secure, and enjoyable for everyone.
        </p>
        <p className="story-text">
          Our team works tirelessly to curate the best selection of products across various categories, 
          ensuring that every item meets our strict quality standards. Customer satisfaction is at the heart 
          of everything we do.
        </p>
      </div>

      {/* Values */}
      <div className="values-grid">
        <div className="value-card">
          <Award size={48} className="value-icon" />
          <h3 className="value-title">Quality First</h3>
          <p className="value-description">We only sell products we believe in and stand behind</p>
        </div>
        <div className="value-card">
          <TrendingUp size={48} className="value-icon" />
          <h3 className="value-title">Best Prices</h3>
          <p className="value-description">Competitive pricing guaranteed on all products</p>
        </div>
        <div className="value-card">
          <Heart size={48} className="value-icon" />
          <h3 className="value-title">Customer Love</h3>
          <p className="value-description">Your satisfaction is our top priority</p>
        </div>
      </div>

      {/* Mission & Vision */}
      <div className="mission-vision-grid">
        <div className="mission-card">
          <Target size={48} className="mv-icon" />
          <h3 className="mv-title">Our Mission</h3>
          <p className="mv-text">
            To provide an exceptional online shopping experience by offering quality products, 
            competitive prices, and outstanding customer service that exceeds expectations.
          </p>
        </div>
        <div className="vision-card">
          <Zap size={48} className="mv-icon" />
          <h3 className="mv-title">Our Vision</h3>
          <p className="mv-text">
            To become the most trusted and preferred online shopping destination, known for 
            innovation, reliability, and customer-centric approach in everything we do.
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="stats-section">
        <h3 className="stats-heading">ShopHub in Numbers</h3>
        <div className="stats-grid">
          <div className="stat-item">
            <p className="stat-number">10K+</p>
            <p className="stat-label">Happy Customers</p>
          </div>
          <div className="stat-item">
            <p className="stat-number">5K+</p>
            <p className="stat-label">Products</p>
          </div>
          <div className="stat-item">
            <p className="stat-number">50+</p>
            <p className="stat-label">Countries</p>
          </div>
          <div className="stat-item">
            <p className="stat-number">24/7</p>
            <p className="stat-label">Support</p>
          </div>
        </div>
      </div>
    </div>
  );
};