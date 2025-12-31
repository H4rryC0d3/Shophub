// src/components/ProductCard.jsx
// FINAL VERSION - 100% Self-Contained with Inline Styles - INR Currency
import { useContext, useState } from 'react';
import { Package, Heart, Star, ShoppingCart } from 'lucide-react';
import { CartContext } from '../context/CartContext';

export const ProductCard = ({ product, goToProductDetail }) => {
  const { addToCart, addToWishlist, isInWishlist } = useContext(CartContext);
  const [added, setAdded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleAddToCart = (e) => {
    e.stopPropagation();
    const result = addToCart(product);
    if (result && result.success) {
      setAdded(true);
      setTimeout(() => setAdded(false), 2000);
    }
  };

  const handleWishlist = (e) => {
    e.stopPropagation();
    addToWishlist(product);
  };

  const handleClick = () => {
    if (goToProductDetail) {
      goToProductDetail(product._id);
    }
  };

  const getProductImage = () => {
    if (product.images && product.images.length > 0) return product.images[0];
    if (product.image) return product.image;
    if (product.imageUrl) return product.imageUrl;
    return null;
  };

  const productImage = getProductImage();
  const inWishlist = isInWishlist(product._id);

  if (!product) {
    return (
      <div style={{
        background: '#fee2e2',
        padding: '2rem',
        borderRadius: '12px',
        color: '#991b1b',
        textAlign: 'center',
        fontWeight: 600
      }}>
        ❌ No product data
      </div>
    );
  }

  // All styles as JavaScript objects
  const styles = {
    card: {
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: '#ffffff',
      borderRadius: '16px',
      overflow: 'hidden',
      boxShadow: isHovered ? '0 12px 24px rgba(0, 0, 0, 0.15)' : '0 2px 8px rgba(0, 0, 0, 0.08)',
      transition: 'all 0.3s ease',
      cursor: 'pointer',
      height: '100%',
      transform: isHovered ? 'translateY(-8px)' : 'translateY(0)',
      border: '1px solid #e5e7eb'
    },
    imageContainer: {
      position: 'relative',
      width: '100%',
      paddingTop: '100%',
      backgroundColor: '#f8f9fa',
      overflow: 'hidden'
    },
    image: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      display: 'block'
    },
    placeholder: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #e0f2fe 0%, #dbeafe 100%)',
      color: '#60a5fa'
    },
    wishlistBtn: {
      position: 'absolute',
      top: '12px',
      right: '12px',
      width: '40px',
      height: '40px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#ffffff',
      border: 'none',
      borderRadius: '50%',
      cursor: 'pointer',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
      zIndex: 2,
      color: inWishlist ? '#ef4444' : '#9ca3af',
      transition: 'all 0.2s ease'
    },
    badgesContainer: {
      position: 'absolute',
      top: '12px',
      left: '12px',
      display: 'flex',
      flexDirection: 'column',
      gap: '0.5rem',
      zIndex: 2
    },
    badge: {
      display: 'inline-block',
      padding: '0.375rem 0.75rem',
      borderRadius: '6px',
      fontSize: '0.75rem',
      fontWeight: 700,
      textTransform: 'uppercase',
      letterSpacing: '0.5px',
      lineHeight: 1
    },
    content: {
      padding: '1.25rem',
      display: 'flex',
      flexDirection: 'column',
      gap: '0.75rem',
      flex: 1,
      backgroundColor: '#ffffff'
    },
    category: {
      display: 'inline-block',
      fontSize: '0.75rem',
      fontWeight: 600,
      color: '#667eea',
      textTransform: 'uppercase',
      letterSpacing: '0.5px',
      margin: 0,
      padding: 0
    },
    title: {
      fontSize: '1rem',
      fontWeight: 700,
      color: '#1f2937',
      lineHeight: 1.4,
      margin: 0,
      padding: 0,
      display: '-webkit-box',
      WebkitLineClamp: 2,
      WebkitBoxOrient: 'vertical',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    },
    description: {
      fontSize: '0.875rem',
      color: '#6b7280',
      lineHeight: 1.5,
      margin: 0,
      padding: 0,
      display: '-webkit-box',
      WebkitLineClamp: 2,
      WebkitBoxOrient: 'vertical',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    },
    ratingContainer: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem'
    },
    stars: {
      display: 'flex',
      alignItems: 'center',
      gap: '2px'
    },
    ratingText: {
      fontSize: '0.875rem',
      color: '#6b7280',
      fontWeight: 500,
      margin: 0
    },
    footer: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: '1rem',
      marginTop: 'auto',
      paddingTop: '0.75rem',
      borderTop: '1px solid #e5e7eb'
    },
    priceContainer: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      flexWrap: 'wrap'
    },
    price: {
      fontSize: '1.25rem',
      fontWeight: 800,
      color: '#1f2937',
      margin: 0
    },
    originalPrice: {
      fontSize: '0.875rem',
      color: '#9ca3af',
      textDecoration: 'line-through',
      margin: 0
    },
    button: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '0.5rem',
      padding: '0.625rem 1rem',
      border: 'none',
      borderRadius: '8px',
      fontSize: '0.875rem',
      fontWeight: 600,
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      whiteSpace: 'nowrap',
      lineHeight: 1
    },
    stockInfo: {
      fontSize: '0.75rem',
      color: '#f59e0b',
      fontWeight: 600,
      margin: 0,
      padding: '0.5rem 0.75rem',
      backgroundColor: '#fef3c7',
      borderRadius: '6px',
      textAlign: 'center'
    }
  };

  return (
    <div 
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={styles.card}
    >
      {/* Image Container */}
      <div style={styles.imageContainer}>
        {productImage && !imageError ? (
          <img 
            src={productImage} 
            alt={product.name || 'Product'}
            style={styles.image}
            onError={() => setImageError(true)}
          />
        ) : (
          <div style={styles.placeholder}>
            <Package size={64} strokeWidth={1.5} />
          </div>
        )}

        {/* Wishlist Button */}
        <button 
          onClick={handleWishlist}
          style={styles.wishlistBtn}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          <Heart size={20} fill={inWishlist ? '#ef4444' : 'none'} strokeWidth={2} />
        </button>

        {/* Badges */}
        <div style={styles.badgesContainer}>
          {product.stock === 0 && (
            <span style={{...styles.badge, backgroundColor: '#ef4444', color: 'white'}}>
              Out of Stock
            </span>
          )}
          {product.stock > 0 && product.stock < 10 && (
            <span style={{...styles.badge, backgroundColor: '#f59e0b', color: 'white'}}>
              Low Stock
            </span>
          )}
          {product.isNew && (
            <span style={{...styles.badge, backgroundColor: '#10b981', color: 'white'}}>
              New
            </span>
          )}
          {product.discount && (
            <span style={{...styles.badge, backgroundColor: '#ef4444', color: 'white'}}>
              -{product.discount}%
            </span>
          )}
        </div>
      </div>

      {/* Product Info */}
      <div style={styles.content}>
        {/* Category */}
        {product.category && (
          <span style={styles.category}>{product.category}</span>
        )}

        {/* Product Name */}
        <h3 style={styles.title}>
          {product.name || 'Unnamed Product'}
        </h3>

        {/* Description */}
        {product.description && (
          <p style={styles.description}>
            {product.description}
          </p>
        )}

        {/* Rating */}
        <div style={styles.ratingContainer}>
          <div style={styles.stars}>
            {[0, 1, 2, 3, 4].map((index) => (
              <Star 
                key={index} 
                size={16}
                color={index < Math.round(product.rating || 0) ? '#fbbf24' : '#d1d5db'}
                fill={index < Math.round(product.rating || 0) ? '#fbbf24' : 'none'}
                strokeWidth={2}
              />
            ))}
          </div>
          <span style={styles.ratingText}>
            {product.rating?.toFixed(1) || '0.0'} ({product.numReviews || 0})
          </span>
        </div>

        {/* Price and Add to Cart */}
        <div style={styles.footer}>
          <div style={styles.priceContainer}>
            {product.originalPrice && product.originalPrice > product.price ? (
              <>
                <span style={styles.originalPrice}>
                  ₹{product.originalPrice}
                </span>
                <span style={styles.price}>
                  ₹{product.price || 0}
                </span>
              </>
            ) : (
              <span style={styles.price}>
                ₹{product.price || 0}
              </span>
            )}
          </div>

          <button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            style={{
              ...styles.button,
              backgroundColor: added ? '#10b981' : product.stock === 0 ? '#e5e7eb' : '#667eea',
              color: product.stock === 0 ? '#9ca3af' : 'white',
              cursor: product.stock === 0 ? 'not-allowed' : 'pointer',
              opacity: product.stock === 0 ? 0.6 : 1
            }}
            onMouseEnter={(e) => {
              if (product.stock !== 0 && !added) {
                e.currentTarget.style.backgroundColor = '#5568d3';
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(102, 126, 234, 0.4)';
              }
            }}
            onMouseLeave={(e) => {
              if (product.stock !== 0 && !added) {
                e.currentTarget.style.backgroundColor = '#667eea';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }
            }}
          >
            <ShoppingCart size={18} strokeWidth={2} />
            <span>{added ? 'Added!' : product.stock === 0 ? 'Out' : 'Add'}</span>
          </button>
        </div>

        {/* Stock Info */}
        {product.stock > 0 && product.stock < 20 && (
          <p style={styles.stockInfo}>
            Only {product.stock} left in stock!
          </p>
        )}
      </div>
    </div>
  );
};