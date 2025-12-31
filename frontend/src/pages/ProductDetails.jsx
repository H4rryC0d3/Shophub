// src/pages/ProductDetailPage.jsx
import { useState, useEffect, useContext } from 'react';
import { CartContext } from '../context/CartContext';
import api from '../services/api';
import { 
  ArrowLeft, 
  Heart, 
  ShoppingCart, 
  Star, 
  Truck, 
  Shield, 
  Package,
  Plus,
  Minus,
  Check
} from 'lucide-react';
import '../styles/ProductDetails.css';

export const ProductDetailsPage = ({ productId, setCurrentPage }) => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);

  const { addToCart, addToWishlist, isInWishlist } = useContext(CartContext);

  const goBack = () => setCurrentPage('products');

  useEffect(() => {
    fetchProduct();
  }, [productId]);

  const fetchProduct = async () => {
    setLoading(true);
    try {
      const data = await api.getProduct(productId);
      setProduct(data);
    } catch (error) {
      console.error('Failed to fetch product:', error);
    } finally {
      setLoading(false);
    }
  };

  const getProductImages = () => {
    if (!product) return [];
    if (product.images && product.images.length > 0) return product.images;
    if (product.image) return [product.image];
    if (product.imageUrl) return [product.imageUrl];
    return [];
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const incrementQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  if (loading) {
    return (
      <div className="product-detail-page">
        <div className="product-detail-loading">
          <div className="loading-spinner"></div>
          <p>Loading product...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="product-detail-page">
        <div className="product-detail-error">
          <h2>Product not found</h2>
          <button onClick={goBack} className="back-button">
            <ArrowLeft size={20} />
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const images = getProductImages();
  const inWishlist = isInWishlist(product._id);

  return (
    <div className="product-detail-page">
      <div className="product-detail-container">
        <button onClick={goBack} className="back-button">
          <ArrowLeft size={20} />
          <span>Back to Products</span>
        </button>

        <div className="product-detail-content">
          <div className="product-gallery">
            <div className="main-image-container">
              {images.length > 0 ? (
                <img 
                  src={images[selectedImage]} 
                  alt={product.name}
                  className="main-image"
                />
              ) : (
                <div className="main-image-placeholder">
                  <Package size={120} />
                </div>
              )}

              <div className="product-badges">
                {product.isNew && <span className="badge badge-new">New</span>}
                {product.discount > 0 && (
                  <span className="badge badge-sale">-{product.discount}%</span>
                )}
                {product.stock === 0 && (
                  <span className="badge badge-out">Out of Stock</span>
                )}
                {product.stock > 0 && product.stock < 10 && (
                  <span className="badge badge-low">Low Stock</span>
                )}
              </div>
            </div>

            {images.length > 1 && (
              <div className="thumbnail-gallery">
                {images.map((img, index) => (
                  <div
                    key={index}
                    className={`thumbnail ₹{selectedImage === index ? 'active' : ''}`}
                    onClick={() => setSelectedImage(index)}
                  >
                    <img src={img} alt={`₹{product.name} ₹{index + 1}`} />
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="product-info">
            {product.category && (
              <span className="product-category">{product.category}</span>
            )}

            <h1 className="product-title">{product.name}</h1>

            <div className="product-rating">
              <div className="stars">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    size={20}
                    className={i < Math.round(product.rating || 0) ? 'star-filled' : 'star-empty'}
                  />
                ))}
              </div>
              <span className="rating-text">
                {product.rating?.toFixed(1) || '0.0'} ({product.numReviews || 0} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="product-pricing">
              {product.originalPrice && product.originalPrice > product.price ? (
                <>
                  <span className="price-original">₹{product.originalPrice}</span>
                  <span className="price-current">₹{product.price}</span>
                  <span className="price-save">
                    Save ₹{(product.originalPrice - product.price).toFixed(2)}
                  </span>
                </>
              ) : (
                <span className="price-current">₹{product.price}</span>
              )}
            </div>

            <div className="product-description">
              <h3>Description</h3>
              <p>{product.description}</p>
            </div>

            <div className="product-stock">
              {product.stock > 0 ? (
                <span className="stock-available">
                  <Check size={18} />
                  In Stock ({product.stock} available)
                </span>
              ) : (
                <span className="stock-unavailable">Out of Stock</span>
              )}
            </div>

            {product.stock > 0 && (
              <div className="quantity-section">
                <label>Quantity:</label>
                <div className="quantity-controls">
                  <button onClick={decrementQuantity} disabled={quantity <= 1} className="qty-button">
                    <Minus size={18} />
                  </button>
                  <span className="qty-display">{quantity}</span>
                  <button onClick={incrementQuantity} disabled={quantity >= product.stock} className="qty-button">
                    <Plus size={18} />
                  </button>
                </div>
              </div>
            )}

            <div className="product-actions">
              <button
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className={`add-to-cart-btn ₹{addedToCart ? 'added' : ''}`}
              >
                {addedToCart ? (
                  <>
                    <Check size={20} />
                    <span>Added to Cart!</span>
                  </>
                ) : (
                  <>
                    <ShoppingCart size={20} />
                    <span>{product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}</span>
                  </>
                )}
              </button>

              <button
                onClick={() => addToWishlist(product)}
                className={`wishlist-btn ₹{inWishlist ? 'active' : ''}`}
              >
                <Heart size={20} className={inWishlist ? 'filled' : ''} />
              </button>
            </div>

            <div className="product-features">
              <div className="feature-item">
                <Truck size={24} />
                <div>
                  <strong>Free Shipping</strong>
                  <p>On orders over ₹50</p>
                </div>
              </div>
              <div className="feature-item">
                <Shield size={24} />
                <div>
                  <strong>Secure Payment</strong>
                  <p>100% secure transaction</p>
                </div>
              </div>
              <div className="feature-item">
                <Package size={24} />
                <div>
                  <strong>Easy Returns</strong>
                  <p>30-day return policy</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};
