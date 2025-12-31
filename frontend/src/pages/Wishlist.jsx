// src/pages/WishlistPage.jsx
import { useContext, useEffect } from 'react';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import { Heart, ShoppingCart, Trash2, ArrowLeft, Package, Lock } from 'lucide-react';
import '../styles/Wishlist.css';

export const WishlistPage = ({ setCurrentPage, goToProductDetails }) => {
  const { user } = useContext(AuthContext);
  const {
    wishlist,
    wishlistCount,
    removeFromWishlist,
    clearWishlist,
    moveToCart
  } = useContext(CartContext);

  // 🔒 AUTHENTICATION CHECK - Redirect to login if not authenticated
  useEffect(() => {
    if (!user) {
      alert('Please login to view your wishlist');
      setCurrentPage('login');
    }
  }, [user, setCurrentPage]);

  const goToProducts = () => setCurrentPage('products');

  const getProductImage = (product) => {
    if (product.images && product.images.length > 0) return product.images[0];
    if (product.image) return product.image;
    if (product.imageUrl) return product.imageUrl;
    return null;
  };

  const handleMoveToCart = (product) => {
    if (!user) {
      alert('Please login to add items to cart');
      setCurrentPage('login');
      return;
    }
    moveToCart(product._id);
  };

  if (!user) {
    return (
      <div className="wishlist-page">
        <div className="wishlist-empty">
          <div className="wishlist-empty-icon">
            <Lock size={80} />
          </div>
          <h2 className="wishlist-empty-title">Login Required</h2>
          <p className="wishlist-empty-text">
            Please login to view your wishlist
          </p>
          <button onClick={() => setCurrentPage('login')} className="wishlist-empty-button">
            <Lock size={20} />
            <span>Go to Login</span>
          </button>
        </div>
      </div>
    );
  }

  if (wishlist.length === 0) {
    return (
      <div className="wishlist-page">
        <div className="wishlist-empty">
          <div className="wishlist-empty-icon">
            <Heart size={80} />
          </div>
          <h2 className="wishlist-empty-title">Your Wishlist is Empty</h2>
          <p className="wishlist-empty-text">
            Save your favorite items and they'll show up here
          </p>
          <button onClick={goToProducts} className="wishlist-empty-button">
            <ArrowLeft size={20} />
            <span>Browse Products</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="wishlist-page">
      <div className="wishlist-container">
        <div className="wishlist-header">
          <button onClick={goToProducts} className="wishlist-back-button">
            <ArrowLeft size={20} />
            <span>Continue Shopping</span>
          </button>
          <h1 className="wishlist-title">
            <Heart size={32} className="wishlist-title-icon" />
            My Wishlist ({wishlistCount} items)
          </h1>
          <button onClick={clearWishlist} className="wishlist-clear-button">
            <Trash2 size={18} />
            <span>Clear All</span>
          </button>
        </div>

        <div className="wishlist-grid">
          {wishlist.map((product) => {
            const productImage = getProductImage(product);
            
            return (
              <div key={product._id} className="wishlist-card">
                <button
                  onClick={() => removeFromWishlist(product._id)}
                  className="wishlist-card-remove"
                  title="Remove from wishlist"
                >
                  <Trash2 size={18} />
                </button>

                <div 
                  className="wishlist-card-image-container"
                  onClick={() => goToProductDetails && goToProductDetails(product._id)}
                >
                  {productImage ? (
                    <img 
                      src={productImage} 
                      alt={product.name}
                      className="wishlist-card-image"
                    />
                  ) : (
                    <div className="wishlist-card-placeholder">
                      <Package size={64} />
                    </div>
                  )}
                  
                  {product.stock === 0 && (
                    <span className="wishlist-badge badge-out-of-stock">
                      Out of Stock
                    </span>
                  )}
                  {product.stock > 0 && product.stock < 10 && (
                    <span className="wishlist-badge badge-low-stock">
                      Low Stock
                    </span>
                  )}
                </div>

                <div className="wishlist-card-content">
                  {product.category && (
                    <span className="wishlist-card-category">
                      {product.category}
                    </span>
                  )}
                  
                  <h3 className="wishlist-card-title">{product.name}</h3>
                  
                  <p className="wishlist-card-description">
                    {product.description}
                  </p>

                  <div className="wishlist-card-footer">
                    <div className="wishlist-card-price-section">
                      {product.originalPrice && product.originalPrice > product.price ? (
                        <>
                          <span className="wishlist-card-price-original">
                            ₹{product.originalPrice}
                          </span>
                          <span className="wishlist-card-price">
                            ₹{product.price}
                          </span>
                        </>
                      ) : (
                        <span className="wishlist-card-price">
                          ₹{product.price}
                        </span>
                      )}
                    </div>

                    <button
                      onClick={() => handleMoveToCart(product)}
                      disabled={product.stock === 0}
                      className={`wishlist-card-button ${
                        product.stock === 0 ? 'wishlist-card-button-disabled' : ''
                      }`}
                    >
                      <ShoppingCart size={18} />
                      <span>
                        {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
