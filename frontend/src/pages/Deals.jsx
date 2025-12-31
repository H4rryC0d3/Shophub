import { useState, useEffect } from 'react';
import { Tag, Clock, Zap, TrendingUp, Package } from 'lucide-react';
import { ProductCard } from '../components/ProductCard';
import api from '../services/api';
import '../styles/Deals.css';

export const DealsPage = () => {
  const [products, setProducts] = useState([]);
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 45,
    seconds: 30
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await api.getProducts();
        setProducts(data);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      }
    };
    fetchProducts();

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let { hours, minutes, seconds } = prev;
        
        if (seconds > 0) {
          seconds--;
        } else if (minutes > 0) {
          minutes--;
          seconds = 59;
        } else if (hours > 0) {
          hours--;
          minutes = 59;
          seconds = 59;
        }
        
        return { hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="deals-page">
      {/* Flash Sale Banner */}
      <div className="flash-sale-banner">
        <div className="banner-circle banner-circle-top"></div>
        <div className="banner-circle banner-circle-bottom"></div>
        
        <div className="banner-content">
          <div className="banner-header">
            <Zap size={32} className="banner-icon" />
            <h1 className="banner-title">Flash Sale!</h1>
          </div>
          <p className="banner-subtitle">Up to 70% OFF on selected items</p>
          
          {/* Countdown Timer */}
          <div className="countdown-section">
            <Clock size={24} className="countdown-icon" />
            <span className="countdown-label">Ends in:</span>
            <div className="countdown-timer">
              <div className="time-box">
                <div className="time-value">{String(timeLeft.hours).padStart(2, '0')}</div>
                <div className="time-label">Hours</div>
              </div>
              <div className="time-separator">:</div>
              <div className="time-box">
                <div className="time-value">{String(timeLeft.minutes).padStart(2, '0')}</div>
                <div className="time-label">Minutes</div>
              </div>
              <div className="time-separator">:</div>
              <div className="time-box">
                <div className="time-value">{String(timeLeft.seconds).padStart(2, '0')}</div>
                <div className="time-label">Seconds</div>
              </div>
            </div>
          </div>
          
          <button className="shop-sale-button">
            Shop Flash Sale
          </button>
        </div>
      </div>

      {/* Deal Categories */}
      <div className="deal-categories">
        <div className="category-card category-blue">
          <Tag size={40} className="category-icon" />
          <h3 className="category-title">Daily Deals</h3>
          <p className="category-description">New deals every day</p>
          <span className="category-discount">Save up to 50%</span>
        </div>
        
        <div className="category-card category-purple">
          <TrendingUp size={40} className="category-icon" />
          <h3 className="category-title">Trending Now</h3>
          <p className="category-description">Most popular items</p>
          <span className="category-discount">Limited Stock</span>
        </div>
        
        <div className="category-card category-green">
          <Zap size={40} className="category-icon" />
          <h3 className="category-title">Clearance</h3>
          <p className="category-description">Final markdowns</p>
          <span className="category-discount">Up to 70% OFF</span>
        </div>
      </div>

      {/* Featured Deals */}
      <div className="featured-deals">
        <h2 className="deals-heading">
          <Tag className="deals-heading-icon" />
          Today's Best Deals
        </h2>
        <div className="deals-grid">
          {products.slice(0, 8).map(product => (
            <div key={product._id} className="deal-product">
              <div className="discount-badge">
                -{Math.floor(Math.random() * 50 + 20)}%
              </div>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>

      {/* Special Offers */}
      <div className="special-offers">
        <div className="offer-card offer-orange">
          <Package size={48} className="offer-icon" />
          <h3 className="offer-title">Bundle & Save</h3>
          <p className="offer-description">Buy 2 or more items and get an extra 15% off</p>
          <button className="offer-button offer-button-orange">
            Shop Bundles
          </button>
        </div>
        
        <div className="offer-card offer-indigo">
          <Zap size={48} className="offer-icon" />
          <h3 className="offer-title">Free Shipping</h3>
          <p className="offer-description">On all orders over $50 - Limited time only!</p>
          <button className="offer-button offer-button-indigo">
            Start Shopping
          </button>
        </div>
      </div>
    </div>
  );
};