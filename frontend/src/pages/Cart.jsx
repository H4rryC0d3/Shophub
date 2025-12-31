// src/pages/CartPage.jsx
import { useContext, useEffect } from 'react';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft, Package, Lock } from 'lucide-react';
import '../styles/Cart.css';

export const CartPage = ({ setCurrentPage }) => {
  const { user } = useContext(AuthContext);
  const {
    cartItems,
    cartTotal,
    cartCount,
    removeFromCart,
    incrementQuantity,
    decrementQuantity,
    clearCart
  } = useContext(CartContext);

  useEffect(() => {
    if (!user) {
      alert('Please login to view your cart');
      setCurrentPage('login');
    }
  }, [user, setCurrentPage]);

  const goToProducts = () => setCurrentPage('products');
  const goToCheckout = () => setCurrentPage('checkout');

  const handleCheckout = () => {
    if (!user) {
      alert('Please login to proceed with checkout');
      setCurrentPage('login');
      return;
    }
    goToCheckout();
  };

  const getProductImage = (product) => {
    if (product.images && product.images.length > 0) return product.images[0];
    if (product.image) return product.image;
    if (product.imageUrl) return product.imageUrl;
    return null;
  };

  if (!user) {
    return (
      <div className="cart-page">
        <div className="cart-empty">
          <div className="cart-empty-icon">
            <Lock size={80} />
          </div>
          <h2 className="cart-empty-title">Login Required</h2>
          <p className="cart-empty-text">
            Please login to view your cart
          </p>
          <button onClick={() => setCurrentPage('login')} className="cart-empty-button">
            <Lock size={20} />
            <span>Go to Login</span>
          </button>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="cart-page">
        <div className="cart-empty">
          <div className="cart-empty-icon">
            <ShoppingBag size={80} />
          </div>
          <h2 className="cart-empty-title">Your Cart is Empty</h2>
          <p className="cart-empty-text">
            Add some products to your cart and they'll show up here
          </p>
          <button onClick={goToProducts} className="cart-empty-button">
            <ArrowLeft size={20} />
            <span>Continue Shopping</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="cart-container">
        <div className="cart-header">
          <button onClick={goToProducts} className="cart-back-button">
            <ArrowLeft size={20} />
            <span>Continue Shopping</span>
          </button>
          <h1 className="cart-title">Shopping Cart ({cartCount} items)</h1>
          <button onClick={clearCart} className="cart-clear-button">
            <Trash2 size={18} />
            <span>Clear Cart</span>
          </button>
        </div>

        <div className="cart-content">
          <div className="cart-items">
            {cartItems.map((item) => {
              const itemImage = getProductImage(item);
              
              return (
                <div key={item._id} className="cart-item">
                  <div className="cart-item-image-container">
                    {itemImage ? (
                      <img 
                        src={itemImage} 
                        alt={item.name}
                        className="cart-item-image"
                      />
                    ) : (
                      <div className="cart-item-placeholder">
                        <Package size={40} />
                      </div>
                    )}
                  </div>

                  <div className="cart-item-details">
                    <h3 className="cart-item-name">{item.name}</h3>
                    <p className="cart-item-description">{item.description}</p>
                    {item.category && (
                      <span className="cart-item-category">{item.category}</span>
                    )}
                  </div>

                  <div className="cart-item-actions">
                    <div className="cart-item-quantity">
                      <button
                        onClick={() => decrementQuantity(item._id)}
                        className="quantity-button"
                        disabled={item.quantity <= 1}
                      >
                        <Minus size={16} />
                      </button>
                      <span className="quantity-display">{item.quantity}</span>
                      <button
                        onClick={() => incrementQuantity(item._id)}
                        className="quantity-button"
                        disabled={item.quantity >= item.stock}
                      >
                        <Plus size={16} />
                      </button>
                    </div>

                    <div className="cart-item-price-section">
                      <span className="cart-item-unit-price">₹{item.price} each</span>
                      <span className="cart-item-total-price">
                        ₹{(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>

                    <button
                      onClick={() => removeFromCart(item._id)}
                      className="cart-item-remove"
                      title="Remove from cart"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="cart-summary">
            <h2 className="cart-summary-title">Order Summary</h2>
            
            <div className="cart-summary-details">
              <div className="cart-summary-row">
                <span>Subtotal</span>
                <span>₹{cartTotal.toFixed(2)}</span>
              </div>
              <div className="cart-summary-row">
                <span>Shipping</span>
                <span className="cart-summary-free">Free</span>
              </div>
              <div className="cart-summary-row">
                <span>Tax</span>
                <span>₹{(cartTotal * 0.1).toFixed(2)}</span>
              </div>
              
              <div className="cart-summary-divider"></div>
              
              <div className="cart-summary-row cart-summary-total">
                <span>Total</span>
                <span>₹{(cartTotal * 1.1).toFixed(2)}</span>
              </div>
            </div>

            <button onClick={handleCheckout} className="cart-checkout-button">
              <ShoppingBag size={20} />
              <span>Proceed to Checkout</span>
            </button>

            <div className="cart-summary-info">
              <p>✓ Free shipping on orders over ₹50</p>
              <p>✓ Secure checkout</p>
              <p>✓ 30-day return policy</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
