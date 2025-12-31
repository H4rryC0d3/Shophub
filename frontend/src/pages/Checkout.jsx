// src/pages/CheckoutPage.jsx
import { useState, useContext, useEffect } from 'react';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import api from '../services/api';
import { 
  ArrowLeft, 
  CreditCard, 
  Truck, 
  MapPin, 
  User, 
  Mail, 
  Phone,
  Lock,
  CheckCircle,
  Smartphone,
  Banknote
} from 'lucide-react';
import '../styles/Checkout.css';

export const CheckoutPage = ({ setCurrentPage }) => {
  const { user, token } = useContext(AuthContext);
  const { cartItems, cartTotal, clearCart } = useContext(CartContext);
  const [step, setStep] = useState(1);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [finalTotal, setFinalTotal] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState(''); // upi, card, cod

  // 🔒 AUTHENTICATION CHECK - Redirect to login if not authenticated
  useEffect(() => {
    if (!user) {
      alert('Please login to proceed with checkout');
      setCurrentPage('login');
    }
  }, [user, setCurrentPage]);

  // Check if cart is empty
  useEffect(() => {
    if (user && cartItems.length === 0 && !orderPlaced) {
      alert('Your cart is empty');
      setCurrentPage('products');
    }
  }, [user, cartItems, orderPlaced, setCurrentPage]);

  const goToCart = () => setCurrentPage('cart');
  const goToHome = () => setCurrentPage('home');

  const [shippingInfo, setShippingInfo] = useState({
    fullName: user?.name || '',
    email: user?.email || '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'India'
  });

  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: ''
    // upiId: ''
  });

  const handleShippingChange = (e) => {
    setShippingInfo({
      ...shippingInfo,
      [e.target.name]: e.target.value
    });
  };

  const handlePaymentChange = (e) => {
    let value = e.target.value;
    
    // Format card number with spaces
    if (e.target.name === 'cardNumber') {
      value = value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim();
    }
    
    // Format expiry date
    if (e.target.name === 'expiryDate') {
      value = value.replace(/\D/g, '').replace(/(\d{2})(\d{0,2})/, '$1/$2').substr(0, 5);
    }
    
    setPaymentInfo({
      ...paymentInfo,
      [e.target.name]: value
    });
  };

  const validateShipping = () => {
    return Object.values(shippingInfo).every(val => val.trim() !== '');
  };

  const validatePayment = () => {
    if (!paymentMethod) return false;
    
    if (paymentMethod === 'cod') return true;
    
    if (paymentMethod === 'upi') {
      return paymentInfo.upiId.trim() !== '';
    }
    
    if (paymentMethod === 'card') {
      return Object.values(paymentInfo).every(val => val.trim() !== '');
    }
    
    return false;
  };

  const handleContinueToPayment = () => {
    if (validateShipping()) {
      setStep(2);
    } else {
      alert('Please fill in all shipping information');
    }
  };

  const handlePlaceOrder = async () => {
    if (!user) {
      alert('Please login to place order');
      setCurrentPage('login');
      return;
    }

    if (!validatePayment()) {
      alert('Please complete payment information');
      return;
    }

    setLoading(true);
    
    try {
      // Prepare payment result based on method
      let paymentResult = {};
      let paymentMethodName = '';
      
      switch(paymentMethod) {
        case 'upi':
          paymentMethodName = 'UPI';
          paymentResult = { upiId: paymentInfo.upiId };
          break;
        case 'card':
          paymentMethodName = 'Credit/Debit Card';
          paymentResult = {
            cardLastFour: paymentInfo.cardNumber.slice(-4),
            cardName: paymentInfo.cardName
          };
          break;
        case 'cod':
          paymentMethodName = 'Cash on Delivery';
          paymentResult = { cod: true };
          break;
        default:
          paymentMethodName = 'Online Payment';
      }

      // Prepare order data
      const orderData = {
        orderItems: cartItems.map(item => ({
          product: item._id,
          name: item.name,
          quantity: item.quantity,
          price: item.price,
          image: item.images?.[0] || item.image || ''
        })),
        shippingAddress: shippingInfo,
        paymentMethod: paymentMethodName,
        paymentResult: paymentResult,
        itemsPrice: cartTotal,
        taxPrice: tax,
        shippingPrice: shipping,
        totalPrice: total
      };

      // Create order in database (with token for authentication)
      const response = await api.createOrder(orderData, token);
      
      if (response.success) {
        setOrderNumber(response.data.orderNumber);
        setFinalTotal(total);
        setOrderPlaced(true);
        setStep(3);
        
        // Clear cart after successful order
        setTimeout(() => {
          clearCart();
        }, 1000);
      } else {
        alert('Failed to place order. Please try again.');
      }
    } catch (error) {
      console.error('Order error:', error);
      alert('Failed to place order: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const tax = cartTotal * 0.1;
  const shipping = cartTotal > 50 ? 0 : 9.99;
  const total = cartTotal + tax + shipping;

  // Don't render checkout if user is not logged in
  if (!user) {
    return (
      <div className="checkout-page">
        <div className="checkout-success">
          <div className="success-icon">
            <Lock size={80} />
          </div>
          <h1 className="success-title">Login Required</h1>
          <p className="success-subtitle">
            Please login to proceed with checkout
          </p>
          <button onClick={() => setCurrentPage('login')} className="btn-primary">
            <Lock size={20} />
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  if (step === 3) {
    return (
      <div className="checkout-page">
        <div className="checkout-success">
          <div className="success-icon">
            <CheckCircle size={80} />
          </div>
          <h1 className="success-title">Order Placed Successfully!</h1>
          <p className="success-subtitle">
            Thank you for your purchase. We'll send you a confirmation email shortly.
          </p>
          
          <div className="success-details">
            <div className="detail-box">
              <h3>Order Number</h3>
              <p className="order-number">{orderNumber || 'Processing...'}</p>
            </div>
            <div className="detail-box">
              <h3>Total Amount</h3>
              <p className="total-amount">₹{finalTotal.toFixed(2)}</p>
            </div>
            <div className="detail-box">
              <h3>Delivery To</h3>
              <p>{shippingInfo.fullName}</p>
              <p className="address">{shippingInfo.address}, {shippingInfo.city}</p>
            </div>
          </div>

          <div className="success-actions">
            <button onClick={goToHome} className="btn-primary">
              Continue Shopping
            </button>
            <button onClick={() => setCurrentPage('orders')} className="btn-secondary">
              View My Orders
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <div className="checkout-container">
        {/* Header */}
        <div className="checkout-header">
          <button onClick={goToCart} className="back-button">
            <ArrowLeft size={20} />
            <span>Back to Cart</span>
          </button>
          <h1 className="checkout-title">Checkout</h1>
        </div>

        {/* Progress Steps */}
        <div className="checkout-steps">
          <div className={`step ${step >= 1 ? 'active' : ''}`}>
            <div className="step-number">1</div>
            <span className="step-label">Shipping</span>
          </div>
          <div className="step-line"></div>
          <div className={`step ${step >= 2 ? 'active' : ''}`}>
            <div className="step-number">2</div>
            <span className="step-label">Payment</span>
          </div>
          <div className="step-line"></div>
          <div className={`step ${step >= 3 ? 'active' : ''}`}>
            <div className="step-number">3</div>
            <span className="step-label">Confirm</span>
          </div>
        </div>

        <div className="checkout-content">
          {/* Left Side - Forms */}
          <div className="checkout-forms">
            {step === 1 && (
              <div className="form-section">
                <h2 className="section-title">
                  <Truck size={24} />
                  Shipping Information
                </h2>
                
                <div className="form-grid">
                  <div className="form-group full-width">
                    <label>
                      <User size={18} />
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={shippingInfo.fullName}
                      onChange={handleShippingChange}
                      placeholder="John Doe"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>
                      <Mail size={18} />
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={shippingInfo.email}
                      onChange={handleShippingChange}
                      placeholder="john@example.com"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>
                      <Phone size={18} />
                      Phone
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={shippingInfo.phone}
                      onChange={handleShippingChange}
                      placeholder="+91 98765 43210"
                      required
                    />
                  </div>

                  <div className="form-group full-width">
                    <label>
                      <MapPin size={18} />
                      Address
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={shippingInfo.address}
                      onChange={handleShippingChange}
                      placeholder="House No, Street, Area"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>City</label>
                    <input
                      type="text"
                      name="city"
                      value={shippingInfo.city}
                      onChange={handleShippingChange}
                      placeholder="Hyderabad"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>State</label>
                    <input
                      type="text"
                      name="state"
                      value={shippingInfo.state}
                      onChange={handleShippingChange}
                      placeholder="Telangana"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>PIN Code</label>
                    <input
                      type="text"
                      name="zipCode"
                      value={shippingInfo.zipCode}
                      onChange={handleShippingChange}
                      placeholder="500034"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Country</label>
                    <input
                      type="text"
                      name="country"
                      value={shippingInfo.country}
                      onChange={handleShippingChange}
                      placeholder="India"
                      required
                    />
                  </div>
                </div>

                <button onClick={handleContinueToPayment} className="btn-continue">
                  Continue to Payment
                </button>
              </div>
            )}

            {step === 2 && (
              <div className="form-section">
                <h2 className="section-title">
  <CreditCard size={24} />
  Select Payment Method
</h2>

                {/* Payment Method Options */}
                <div className="payment-methods">
                  
                  {/* UPI Payment */}
                  <div 
                    className={`payment-option ${paymentMethod === 'upi' ? 'active' : ''}`}
                    onClick={() => setPaymentMethod('upi')}
                  >
                    <div className="payment-option-header">
                      <Smartphone size={24} />
                      <div>
                        <h3>UPI</h3>
                        <p>PhonePe, Google Pay, Paytm & More</p>
                      </div>
                    </div>
                    {paymentMethod === 'upi' && (
                      <div className="payment-details">
                        <div className="upi-options">
                          <button className="upi-btn" type="button">
                            <div className="upi-icon phonepe">P</div>
                            PhonePe
                          </button>
                          <button className="upi-btn" type="button">
                            <div className="upi-icon gpay">G</div>
                            Google Pay
                          </button>
                          <button className="upi-btn" type="button">
                            <div className="upi-icon paytm">P</div>
                            Paytm
                          </button>
                        </div>
                        <div className="divider">
                          <span>OR</span>
                        </div>
                        <div className="form-group">
                          <label>Enter UPI ID</label>
                          <input
                            type="text"
                            name="upiId"
                            value={paymentInfo.upiId}
                            onChange={handlePaymentChange}
                            placeholder="yourname@paytm"
                          />
                        </div>
                      </div>
                    )}
                  </div>


                  {/* Credit/Debit Card */}
                  <div 
                    className={`payment-option ${paymentMethod === 'card' ? 'active' : ''}`}
                    onClick={() => setPaymentMethod('card')}
                  >
                    <div className="payment-option-header">
                      <CreditCard size={24} />
                      <div>
                        <h3>Credit / Debit Card</h3>
                        <p>Visa, Mastercard, RuPay</p>
                      </div>
                    </div>
                    {paymentMethod === 'card' && (
                      <div className="payment-details">
                        <div className="form-group">
                          <label>
                            <CreditCard size={18} />
                            Card Number
                          </label>
                          <input
                            type="text"
                            name="cardNumber"
                            value={paymentInfo.cardNumber}
                            onChange={handlePaymentChange}
                            placeholder="1234 5678 9012 3456"
                            maxLength="19"
                            required
                          />
                        </div>

                        <div className="form-group">
                          <label>
                            <User size={18} />
                            Cardholder Name
                          </label>
                          <input
                            type="text"
                            name="cardName"
                            value={paymentInfo.cardName}
                            onChange={handlePaymentChange}
                            placeholder="John Doe"
                            required
                          />
                        </div>

                        <div className="form-grid">
                          <div className="form-group">
                            <label>Expiry Date</label>
                            <input
                              type="text"
                              name="expiryDate"
                              value={paymentInfo.expiryDate}
                              onChange={handlePaymentChange}
                              placeholder="MM/YY"
                              maxLength="5"
                              required
                            />
                          </div>

                          <div className="form-group">
                            <label>
                              <Lock size={18} />
                              CVV
                            </label>
                            <input
                              type="text"
                              name="cvv"
                              value={paymentInfo.cvv}
                              onChange={handlePaymentChange}
                              placeholder="123"
                              maxLength="3"
                              required
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Cash on Delivery */}
                  <div 
                    className={`payment-option ${paymentMethod === 'cod' ? 'active' : ''}`}
                    onClick={() => setPaymentMethod('cod')}
                  >
                    <div className="payment-option-header">
                      <Banknote size={24} />
                      <div>
                        <h3>Cash on Delivery</h3>
                        <p>Pay when you receive</p>
                      </div>
                    </div>
                    {paymentMethod === 'cod' && (
                      <div className="cod-notice">
                        <p>💵 You can pay in cash when your order is delivered.</p>
                        <p className="cod-amount">Amount to pay: ₹{total.toFixed(2)}</p>
                      </div>
                    )}
                  </div>

                </div>

                <div className="payment-actions">
                  <button onClick={() => setStep(1)} className="btn-back">
                    Back to Shipping
                  </button>
                  <button onClick={handlePlaceOrder} className="btn-place-order" disabled={loading}>
                    <Lock size={18} />
                    <span>{loading ? 'Processing...' : 'Place Order'}</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Right Side - Order Summary */}
          <div className="checkout-summary">
            <h2 className="summary-title">Order Summary</h2>
            
            <div className="summary-items">
              {cartItems.map(item => (
                <div key={item._id} className="summary-item">
                  <div className="item-info">
                    <span className="item-name">{item.name}</span>
                    <span className="item-qty">x{item.quantity}</span>
                  </div>
                  <span className="item-price">₹{(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div className="summary-divider"></div>

            <div className="summary-calculations">
              <div className="calc-row">
                <span>Subtotal</span>
                <span>₹{cartTotal.toFixed(2)}</span>
              </div>
              <div className="calc-row">
                <span>Shipping</span>
                <span className={shipping === 0 ? 'free' : ''}>
                  {shipping === 0 ? 'FREE' : `₹${shipping.toFixed(2)}`}
                </span>
              </div>
              <div className="calc-row">
                <span>Tax (10%)</span>
                <span>₹{tax.toFixed(2)}</span>
              </div>
            </div>

            <div className="summary-divider"></div>

            <div className="summary-total">
              <span>Total</span>
              <span className="total-amount">₹{total.toFixed(2)}</span>
            </div>

            <div className="security-info">
              <Lock size={16} />
              <span>Secure SSL Encrypted Payment</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};