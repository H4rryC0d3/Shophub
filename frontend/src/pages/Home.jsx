import { useEffect, useState, useRef } from 'react';
import api from '../services/api';
import { ProductCard } from '../components/ProductCard';
import { 
  Truck, 
  Shield, 
  RefreshCw, 
  ArrowRight,
  TrendingUp,
  Sparkles,
  ChevronRight,
  Zap,
  Clock,
  Award,
  ShoppingBag,
  Star
} from 'lucide-react';
import '../styles/Home.css';

export const HomePage = ({ goToProductDetails, setCurrentPage }) => {
  const goToProducts = () => setCurrentPage('products');
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [trendingProducts, setTrendingProducts] = useState([]);
  const [newArrivals, setNewArrivals] = useState([]);
  const [loading, setLoading] = useState(true);

  // Refs for scroll animations
  const featuredRef = useRef(null);
  const trendingRef = useRef(null);
  const newArrivalsRef = useRef(null);
  const categoriesRef = useRef(null);
  const flashDealsRef = useRef(null);

  useEffect(() => {
    fetchAllProducts();
    setupScrollAnimations();
  }, []);

  const setupScrollAnimations = () => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, observerOptions);

    setTimeout(() => {
      const sections = [featuredRef, trendingRef, newArrivalsRef, categoriesRef, flashDealsRef];
      sections.forEach(ref => {
        if (ref.current) {
          observer.observe(ref.current);
          const rect = ref.current.getBoundingClientRect();
          if (rect.top < window.innerHeight && rect.bottom > 0) {
            ref.current.classList.add('animate-in');
          }
        }
      });
    }, 100);

    return () => observer.disconnect();
  };

  const fetchAllProducts = async () => {
    setLoading(true);
    try {
      let featured = [];
      let trending = [];
      let newItems = [];
      
      try {
        const featuredData = await api.getFeaturedProducts();
        featured = Array.isArray(featuredData) ? featuredData : [];
      } catch (err) {
        // Featured endpoint not available, will use fallback
      }
      
      try {
        const trendingData = await api.getTrendingProducts();
        trending = Array.isArray(trendingData) ? trendingData : [];
      } catch (err) {
        // Trending endpoint not available, will use fallback
      }
      
      // Always fetch all products as backup
      const allProducts = await api.getProducts();
      const products = Array.isArray(allProducts) ? allProducts : [];
      
      // Use fetched data or fallback to all products
      if (featured.length === 0 && products.length > 0) {
        featured = products
          .filter(p => (p.rating || 0) >= 4)
          .slice(0, 8);
      }
      
      if (trending.length === 0 && products.length > 0) {
        trending = [...products]
          .sort((a, b) => (b.numReviews || 0) - (a.numReviews || 0))
          .slice(0, 8);
      }
      
      if (products.length > 0) {
        newItems = products.slice(-4);
      }
      
      setFeaturedProducts(featured);
      setTrendingProducts(trending);
      setNewArrivals(newItems);
    } catch (error) {
      console.error('Failed to fetch products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryClick = (categoryName, event) => {
    if (event) {
      event.stopPropagation();
      event.preventDefault();
    }
    localStorage.setItem('selectedCategory', categoryName);
    goToProducts();
  };

  const categories = [
    { name: 'Electronics', icon: '📱', color: '#667eea' },
    { name: 'Fashion', icon: '👗', color: '#f59e0b' },
    { name: 'Home & Living', icon: '🏡', color: '#10b981' },
    { name: 'Sports', icon: '⚽', color: '#ef4444' },
    { name: 'Beauty', icon: '💄', color: '#ec4899' },
    { name: 'Books', icon: '📚', color: '#8b5cf6' },
  ];

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-overlay"></div>
        <div className="hero-background-pattern"></div>
        <div className="container">
          <div className="hero-grid">
            <div className="hero-content">
              <div className="hero-badge">
                <Sparkles size={16} />
                <span>New Season Collection 2024</span>
              </div>
              <h1 className="hero-title">
                Discover Your
                <br />
                <span className="hero-title-gradient">Perfect Style</span>
              </h1>
              <p className="hero-subtitle">
                Shop the latest trends with exclusive deals. Free shipping on all orders over $50.
              </p>
              <div className="hero-buttons">
                <button onClick={goToProducts} className="hero-button-primary">
                  <ShoppingBag size={20} />
                  <span>Shop Now</span>
                  <ArrowRight size={20} />
                </button>
                <button className="hero-button-secondary">
                  <span>Explore Collections</span>
                </button>
              </div>
              
              <div className="hero-stats">
                <div className="hero-stat">
                  <span className="hero-stat-number">50K+</span>
                  <span className="hero-stat-label">Happy Customers</span>
                </div>
                <div className="hero-stat">
                  <span className="hero-stat-number">10K+</span>
                  <span className="hero-stat-label">Products</span>
                </div>
                <div className="hero-stat">
                  <span className="hero-stat-number">4.8★</span>
                  <span className="hero-stat-label">Average Rating</span>
                </div>
              </div>
            </div>
            
            <div className="hero-images">
              <div className="hero-image-card hero-image-1">
                <img src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=400&h=500&fit=crop" alt="Fashion Model" />
                <div className="hero-image-badge">New Arrival</div>
              </div>
              <div className="hero-image-card hero-image-2">
                <img src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=400&h=500&fit=crop" alt="Fashion Style" />
                <div className="hero-image-badge">Trending</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon-wrapper" style={{ background: '#dbeafe' }}>
                <Truck size={32} style={{ color: '#2563eb' }} />
              </div>
              <div className="feature-content">
                <h3 className="feature-title">Free Shipping</h3>
                <p className="feature-description">On orders over $50</p>
              </div>
            </div>
            <div className="feature-card">
              <div className="feature-icon-wrapper" style={{ background: '#dcfce7' }}>
                <Shield size={32} style={{ color: '#16a34a' }} />
              </div>
              <div className="feature-content">
                <h3 className="feature-title">Secure Payment</h3>
                <p className="feature-description">100% protected transactions</p>
              </div>
            </div>
            <div className="feature-card">
              <div className="feature-icon-wrapper" style={{ background: '#fef3c7' }}>
                <RefreshCw size={32} style={{ color: '#ca8a04' }} />
              </div>
              <div className="feature-content">
                <h3 className="feature-title">Easy Returns</h3>
                <p className="feature-description">30-day return policy</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section ref={categoriesRef} className="categories-section scroll-section">
        <div className="container">
          <div className="section-header-center">
            <h2 className="section-title">Shop by Category</h2>
            <p className="section-subtitle">Find exactly what you're looking for</p>
          </div>
          <div className="categories-grid">
            {categories.map((category, index) => (
              <div 
                key={index}
                className="category-card"
                style={{ '--category-color': category.color }}
                onClick={(e) => handleCategoryClick(category.name, e)}
                role="button"
                tabIndex={0}
                onKeyPress={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    handleCategoryClick(category.name, e);
                  }
                }}
              >
                <div className="category-gradient-bg"></div>
                <span className="category-icon">{category.icon}</span>
                <h3 className="category-name">{category.name}</h3>
                <ChevronRight size={20} className="category-arrow" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Promotional Banner */}
      <section className="promo-banner-section">
        <div className="container">
          <div className="promo-banner-grid">
            <div className="promo-banner promo-banner-large">
              <img src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&h=600&fit=crop" alt="Fashion Sale" />
              <div className="promo-banner-overlay"></div>
              <div className="promo-banner-content">
                <span className="promo-badge">Limited Time</span>
                <h3 className="promo-title">Summer Collection</h3>
                <p className="promo-subtitle">Up to 50% OFF</p>
                <button onClick={goToProducts} className="promo-button">
                  Shop Now
                  <ArrowRight size={18} />
                </button>
              </div>
            </div>
            
            <div className="promo-banner-small-grid">
              <div className="promo-banner promo-banner-small">
                <img src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop" alt="Accessories" />
                <div className="promo-banner-overlay"></div>
                <div className="promo-banner-content">
                  <h3 className="promo-title-small">Accessories</h3>
                  <p className="promo-subtitle-small">Starting at $9.99</p>
                </div>
              </div>
              
              <div className="promo-banner promo-banner-small">
                <img src="https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=400&h=300&fit=crop" alt="Sneakers" />
                <div className="promo-banner-overlay"></div>
                <div className="promo-banner-content">
                  <h3 className="promo-title-small">Footwear</h3>
                  <p className="promo-subtitle-small">New Arrivals</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>



      {/* Flash Deals Section */}
      {!loading && trendingProducts.length > 0 && (
        <section ref={flashDealsRef} style={{
          padding: '4rem 0',
          background: 'linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)',
          color: 'white'
        }}>
          <div className="container">
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '2rem',
              flexWrap: 'wrap',
              gap: '1rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'rgba(255, 255, 255, 0.2)',
                  borderRadius: '12px'
                }}>
                  <Zap size={28} />
                </div>
                <div>
                  <h2 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.25rem' }}>
                    ⚡ Flash Deals
                  </h2>
                  <p style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
                    Limited time offers - Hurry up!
                  </p>
                </div>
              </div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.75rem 1.5rem',
                background: 'rgba(255, 255, 255, 0.2)',
                borderRadius: '12px',
                fontSize: '1.5rem',
                fontWeight: 700
              }}>
                <Clock size={24} />
                <span>23:45:12</span>
              </div>
            </div>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '1.5rem'
            }}>
              {trendingProducts.map(product => (
                <ProductCard 
                  key={product._id} 
                  product={product}
                  goToProductDetail={goToProductDetails}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Trending Products */}
      {!loading && trendingProducts.length > 0 && (
        <section ref={trendingRef} style={{ padding: '4rem 0', background: 'var(--bg-primary, #ffffff)' }}>
          <div className="container">
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '3rem',
              flexWrap: 'wrap',
              gap: '1.5rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '48px',
                  height: '48px',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: 'white',
                  borderRadius: '12px'
                }}>
                  <TrendingUp size={24} />
                </div>
                <div>
                  <h2 style={{ fontSize: '2rem', fontWeight: 700, color: '#1f2937', marginBottom: '0.25rem' }}>
                    Trending Now
                  </h2>
                  <p style={{ fontSize: '1rem', color: '#6b7280' }}>
                    Most popular products this week
                  </p>
                </div>
              </div>
              <button onClick={goToProducts} style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.75rem 1.5rem',
                background: '#667eea',
                border: 'none',
                borderRadius: '10px',
                color: 'white',
                fontSize: '0.9375rem',
                fontWeight: 600,
                cursor: 'pointer'
              }}>
                View All
                <ArrowRight size={18} />
              </button>
            </div>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '1.5rem'
            }}>
              {trendingProducts.map(product => (
                <ProductCard 
                  key={product._id} 
                  product={product}
                  goToProductDetail={goToProductDetails}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* New Arrivals */}
      {!loading && newArrivals.length > 0 && (
        <section ref={newArrivalsRef} style={{ padding: '4rem 0', background: '#f9fafb' }}>
          <div className="container">
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '3rem',
              flexWrap: 'wrap',
              gap: '1.5rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '48px',
                  height: '48px',
                  background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                  color: 'white',
                  borderRadius: '12px'
                }}>
                  <Sparkles size={24} />
                </div>
                <div>
                  <h2 style={{ fontSize: '2rem', fontWeight: 700, color: '#1f2937', marginBottom: '0.25rem' }}>
                    New Arrivals
                  </h2>
                  <p style={{ fontSize: '1rem', color: '#6b7280' }}>
                    Fresh off the shelves
                  </p>
                </div>
              </div>
              <button onClick={goToProducts} style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.75rem 1.5rem',
                background: '#667eea',
                border: 'none',
                borderRadius: '10px',
                color: 'white',
                fontSize: '0.9375rem',
                fontWeight: 600,
                cursor: 'pointer'
              }}>
                View All
                <ArrowRight size={18} />
              </button>
            </div>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '1.5rem'
            }}>
              {newArrivals.map(product => (
                <ProductCard 
                  key={product._id} 
                  product={product}
                  goToProductDetail={goToProductDetails}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Featured Products */}
      {!loading && featuredProducts.length > 0 && (
        <section ref={featuredRef} style={{ padding: '4rem 0', background: '#ffffff' }}>
          <div className="container">
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '3rem',
              flexWrap: 'wrap',
              gap: '1.5rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '48px',
                  height: '48px',
                  background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                  color: 'white',
                  borderRadius: '12px'
                }}>
                  <Award size={24} />
                </div>
                <div>
                  <h2 style={{ fontSize: '2rem', fontWeight: 700, color: '#1f2937', marginBottom: '0.25rem' }}>
                    Featured Products
                  </h2>
                  <p style={{ fontSize: '1rem', color: '#6b7280' }}>
                    Hand-picked for you
                  </p>
                </div>
              </div>
              <button onClick={goToProducts} style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.75rem 1.5rem',
                background: '#667eea',
                border: 'none',
                borderRadius: '10px',
                color: 'white',
                fontSize: '0.9375rem',
                fontWeight: 600,
                cursor: 'pointer'
              }}>
                View All
                <ArrowRight size={18} />
              </button>
            </div>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
              gap: '1.5rem'
            }}>
              {featuredProducts.map(product => (
                <ProductCard 
                  key={product._id} 
                  product={product}
                  goToProductDetail={goToProductDetails}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Loading State */}
      {loading && (
        <div className="loading-section">
          <div className="loading-spinner"></div>
          <p className="loading-text">Loading amazing products...</p>
        </div>
      )}

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-background"></div>
        <div className="container">
          <div className="cta-content">
            <div className="cta-badge">
              <Star size={16} />
              <span>Join Our Community</span>
            </div>
            <h2 className="cta-title">Ready to Start Shopping?</h2>
            <p className="cta-subtitle">
              Join thousands of happy customers and discover amazing deals on your favorite products
            </p>
            <button onClick={goToProducts} className="cta-button">
              <span>Browse All Products</span>
              <ArrowRight size={24} />
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};