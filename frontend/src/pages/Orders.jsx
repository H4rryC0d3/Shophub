// src/pages/OrdersPage.jsx
import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import api from '../services/api';
import { 
  Package, 
  Truck, 
  CheckCircle, 
  XCircle, 
  Clock,
  Eye,
  ChevronRight,
  Calendar,
  DollarSign,
  MapPin,
  CreditCard,
  ArrowLeft,
  Lock,
  IndianRupee
} from 'lucide-react';
import '../styles/Orders.css';

export const OrdersPage = ({ setCurrentPage }) => {
  const { user, token } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [filter, setFilter] = useState('all');

  // 🔒 AUTHENTICATION CHECK - Redirect to login if not authenticated
  useEffect(() => {
    if (!user) {
      alert('Please login to view your orders');
      setCurrentPage('login');
    }
  }, [user, setCurrentPage]);

  useEffect(() => {
    if (user && token) {
      fetchOrders();
    }
  }, [user, token]);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      // Use token to fetch user-specific orders
      const response = await api.getMyOrders(token);
      const ordersData = response.data || response;
      setOrders(Array.isArray(ordersData) ? ordersData : []);
    } catch (error) {
      console.error('Failed to fetch orders:', error);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending':
        return <Clock size={20} className="status-icon pending" />;
      case 'processing':
        return <Package size={20} className="status-icon processing" />;
      case 'shipped':
        return <Truck size={20} className="status-icon shipped" />;
      case 'delivered':
        return <CheckCircle size={20} className="status-icon delivered" />;
      case 'cancelled':
        return <XCircle size={20} className="status-icon cancelled" />;
      default:
        return <Clock size={20} className="status-icon" />;
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: '#f59e0b',
      processing: '#3b82f6',
      shipped: '#8b5cf6',
      delivered: '#10b981',
      cancelled: '#ef4444'
    };
    return colors[status] || '#6b7280';
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const filteredOrders = orders.filter(order => {
    if (filter === 'all') return true;
    return order.orderStatus === filter;
  });

  const viewOrderDetails = (order) => {
    setSelectedOrder(order);
  };

  const closeOrderDetails = () => {
    setSelectedOrder(null);
  };

  // Don't render orders if user is not logged in
  if (!user) {
    return (
      <div className="orders-page">
        <div className="orders-loading">
          <Lock size={80} />
          <h2>Login Required</h2>
          <p>Please login to view your orders</p>
          <button onClick={() => setCurrentPage('login')} className="shop-now-btn">
            <Lock size={20} />
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="orders-page">
        <div className="orders-loading">
          <div className="loading-spinner"></div>
          <p>Loading your orders...</p>
        </div>
      </div>
    );
  }

  // Order Details Modal
  if (selectedOrder) {
    return (
      <div className="order-details-modal">
        <div className="modal-overlay" onClick={closeOrderDetails}></div>
        <div className="modal-content">
          <button className="modal-close" onClick={closeOrderDetails}>
            <XCircle size={24} />
          </button>

          <div className="order-details">
            <div className="order-details-header">
              <h2>Order Details</h2>
              <div className="order-number">#{selectedOrder.orderNumber}</div>
            </div>

            <div className="order-status-section">
              {getStatusIcon(selectedOrder.orderStatus)}
              <span className="order-status-text" style={{ color: getStatusColor(selectedOrder.orderStatus) }}>
                {selectedOrder.orderStatus.toUpperCase()}
              </span>
            </div>

            <div className="order-info-grid">
              <div className="info-box">
                <Calendar size={20} />
                <div>
                  <span className="info-label">Order Date</span>
                  <span className="info-value">{formatDate(selectedOrder.createdAt)}</span>
                </div>
              </div>

              <div className="info-box">
                <IndianRupee size={20} />
                <div>
                  <span className="info-label">Total Amount</span>
                  <span className="info-value">₹{selectedOrder.totalPrice.toFixed(2)}</span>
                </div>
              </div>

              <div className="info-box">
                <CreditCard size={20} />
                <div>
                  <span className="info-label">Payment</span>
                  <span className="info-value">{selectedOrder.paymentStatus}</span>
                </div>
              </div>

              <div className="info-box">
                <Package size={20} />
                <div>
                  <span className="info-label">Items</span>
                  <span className="info-value">{selectedOrder.orderItems.length} items</span>
                </div>
              </div>
            </div>

            <div className="order-section">
              <h3>
                <MapPin size={20} />
                Shipping Address
              </h3>
              <div className="address-box">
                <p className="address-name">{selectedOrder.shippingAddress.fullName}</p>
                <p>{selectedOrder.shippingAddress.address}</p>
                <p>{selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.state} {selectedOrder.shippingAddress.zipCode}</p>
                <p>{selectedOrder.shippingAddress.country}</p>
                <p className="contact-info">
                  <span>{selectedOrder.shippingAddress.email}</span>
                  <span>{selectedOrder.shippingAddress.phone}</span>
                </p>
              </div>
            </div>

            <div className="order-section">
              <h3>
                <Package size={20} />
                Order Items
              </h3>
              <div className="order-items-list">
                {selectedOrder.orderItems.map((item, index) => (
                  <div key={index} className="order-item-row">
                    <div className="item-image">
                      {item.image ? (
                        <img src={item.image} alt={item.name} />
                      ) : (
                        <Package size={40} />
                      )}
                    </div>
                    <div className="item-details">
                      <span className="item-name">{item.name}</span>
                      <span className="item-qty">Qty: {item.quantity}</span>
                    </div>
                    <div className="item-price">
                      ₹{(item.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="order-section">
              <h3>Order Summary</h3>
              <div className="summary-rows">
                <div className="summary-row">
                  <span>Subtotal</span>
                  <span>₹{selectedOrder.itemsPrice.toFixed(2)}</span>
                </div>
                <div className="summary-row">
                  <span>Shipping</span>
                  <span>₹{selectedOrder.shippingPrice.toFixed(2)}</span>
                </div>
                <div className="summary-row">
                  <span>Tax</span>
                  <span>₹{selectedOrder.taxPrice.toFixed(2)}</span>
                </div>
                <div className="summary-row total">
                  <span>Total</span>
                  <span>₹{selectedOrder.totalPrice.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="orders-page">
      <div className="orders-container">
        <div className="orders-header">
          <button onClick={() => setCurrentPage('home')} className="back-btn">
            <ArrowLeft size={20} />
            <span>Back to Home</span>
          </button>
          <h1 className="orders-title">My Orders</h1>
          <p className="orders-subtitle">Track and manage your orders</p>
        </div>

        {/* Filter Tabs */}
        <div className="orders-filters">
          <button 
            className={`filter-btn ₹{filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All Orders ({orders.length})
          </button>
          <button 
            className={`filter-btn ₹{filter === 'pending' ? 'active' : ''}`}
            onClick={() => setFilter('pending')}
          >
            Pending ({orders.filter(o => o.orderStatus === 'pending').length})
          </button>
          <button 
            className={`filter-btn ₹{filter === 'processing' ? 'active' : ''}`}
            onClick={() => setFilter('processing')}
          >
            Processing ({orders.filter(o => o.orderStatus === 'processing').length})
          </button>
          <button 
            className={`filter-btn ₹{filter === 'delivered' ? 'active' : ''}`}
            onClick={() => setFilter('delivered')}
          >
            Delivered ({orders.filter(o => o.orderStatus === 'delivered').length})
          </button>
        </div>

        {/* Orders List */}
        {filteredOrders.length === 0 ? (
          <div className="no-orders">
            <Package size={80} className="no-orders-icon" />
            <h2>No Orders Found</h2>
            <p>You haven't placed any orders yet</p>
            <button onClick={() => setCurrentPage('products')} className="shop-now-btn">
              Start Shopping
            </button>
          </div>
        ) : (
          <div className="orders-list">
            {filteredOrders.map((order) => (
              <div key={order._id} className="order-card">
                <div className="order-card-header">
                  <div className="order-card-info">
                    <span className="order-card-number">#{order.orderNumber}</span>
                    <span className="order-card-date">
                      <Calendar size={14} />
                      {formatDate(order.createdAt)}
                    </span>
                  </div>
                  <div className="order-card-status" style={{ background: `₹{getStatusColor(order.orderStatus)}20`, color: getStatusColor(order.orderStatus) }}>
                    {getStatusIcon(order.orderStatus)}
                    <span>{order.orderStatus}</span>
                  </div>
                </div>

                <div className="order-card-body">
                  <div className="order-card-items">
                    {order.orderItems.slice(0, 3).map((item, index) => (
                      <div key={index} className="order-card-item">
                        <div className="order-item-image">
                          {item.image ? (
                            <img src={item.image} alt={item.name} />
                          ) : (
                            <Package size={24} />
                          )}
                        </div>
                        <span className="order-item-name">{item.name}</span>
                        <span className="order-item-qty">x{item.quantity}</span>
                      </div>
                    ))}
                    {order.orderItems.length > 3 && (
                      <span className="more-items">+{order.orderItems.length - 3} more</span>
                    )}
                  </div>

                  <div className="order-card-details">
                    <div className="order-detail">
                      <span className="detail-label">Items:</span>
                      <span className="detail-value">{order.orderItems.length}</span>
                    </div>
                    <div className="order-detail">
                      <span className="detail-label">Total:</span>
                      <span className="detail-value total-price">₹{order.totalPrice.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <div className="order-card-footer">
                  <button 
                    className="view-details-btn"
                    onClick={() => viewOrderDetails(order)}
                  >
                    <Eye size={18} />
                    <span>View Details</span>
                    <ChevronRight size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};