import { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { User, Package, MapPin, Mail, Calendar, Edit2, Lock } from 'lucide-react';
import api from '../services/api';
import '../styles/Profile.css';

export const ProfilePage = ({ setCurrentPage }) => {
  const { user, token, logout, updateProfile } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: ''
  });
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        email: user.email
      });
    }
  }, [user]);

  useEffect(() => {
    if (token) {
      fetchOrders();
    }
  }, [token]);

  const fetchOrders = async () => {
    try {
      const data = await api.getMyOrders(token);
      setOrders(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Failed to fetch orders:', error);
      setOrders([]); // Set empty array on error
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setMessage({ type: '', text: '' });

    const result = await updateProfile(formData);
    
    if (result.success) {
      setMessage({ type: 'success', text: 'Profile updated successfully!' });
      setEditMode(false);
    } else {
      setMessage({ type: 'error', text: result.error || 'Failed to update profile' });
    }
  };

  const handleCancelOrder = async (orderId) => {
    if (!window.confirm('Are you sure you want to cancel this order?')) {
      return;
    }

    try {
      await api.cancelOrder(token, orderId);
      setMessage({ type: 'success', text: 'Order cancelled successfully' });
      fetchOrders();
    } catch (error) {
      setMessage({ type: 'error', text: error.message || 'Failed to cancel order' });
    }
  };

  const getStatusClass = (status) => {
    const classes = {
      pending: 'status-pending',
      confirmed: 'status-confirmed',
      shipped: 'status-shipped',
      delivered: 'status-delivered',
      cancelled: 'status-cancelled'
    };
    return classes[status] || 'status-default';
  };

  // Helper function to get order items (handles both 'items' and 'orderItems')
  const getOrderItems = (order) => {
    return order.orderItems || order.items || [];
  };

  if (!user) {
    return (
      <div className="no-user-container">
        <User size={64} className="no-user-icon" />
        <h2 className="no-user-title">Please login to view your profile</h2>
        <button onClick={() => setCurrentPage('login')} className="no-user-button">
          Login
        </button>
      </div>
    );
  }

  return (
    <div className="profile-page">
      <h2 className="profile-title">My Profile</h2>
      
      {message.text && (
        <div className={`message-alert ${message.type === 'success' ? 'message-success' : 'message-error'}`}>
          {message.text}
        </div>
      )}
      
      <div className="profile-grid">
        {/* Profile Info */}
        <div className="profile-sidebar">
          <div className="profile-card">
            <div className="avatar-container">
              <div className="avatar-circle">
                <User size={48} className="avatar-icon" />
              </div>
            </div>
            
            {editMode ? (
              <div className="edit-form">
                <div className="form-group">
                  <label className="form-label">Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="form-input"
                  />
                </div>
                <div className="form-buttons">
                  <button onClick={handleUpdateProfile} className="save-button">
                    Save
                  </button>
                  <button
                    onClick={() => {
                      setEditMode(false);
                      setFormData({ name: user.name, email: user.email });
                    }}
                    className="cancel-button"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <>
                <h3 className="user-name">{user.name}</h3>
                
                <div className="user-info">
                  <div className="info-item">
                    <Mail size={18} />
                    <span className="info-text">{user.email}</span>
                  </div>
                  <div className="info-item">
                    <Calendar size={18} />
                    <span className="info-text">Member since {new Date(user.createdAt || Date.now()).getFullYear()}</span>
                  </div>
                  {user.role === 'admin' && (
                    <div className="admin-badge">
                      Admin
                    </div>
                  )}
                </div>
                
                <button onClick={() => setEditMode(true)} className="edit-button">
                  <Edit2 size={18} />
                  Edit Profile
                </button>
                
                <button onClick={logout} className="logout-button">
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
        
        {/* Orders History */}
        <div className="orders-section">
          <div className="orders-card">
            <h3 className="orders-heading">
              <Package size={24} />
              Order History
            </h3>
            
            {loading ? (
              <p className="orders-loading">Loading orders...</p>
            ) : orders.length === 0 ? (
              <p className="orders-empty">No orders yet</p>
            ) : (
              <div className="orders-list">
                {orders.map(order => {
                  const orderItems = getOrderItems(order);
                  
                  return (
                    <div key={order._id} className="order-item">
                      <div className="order-header">
                        <div>
                          <p className="order-number">Order #{order._id.slice(-8)}</p>
                          <p className="order-date">
                            {new Date(order.createdAt).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </p>
                        </div>
                        <span className={`order-status ${getStatusClass(order.orderStatus)}`}>
                          {order.orderStatus.charAt(0).toUpperCase() + order.orderStatus.slice(1)}
                        </span>
                      </div>
                      
                      <div className="order-items">
                        <p className="items-count">Items: {orderItems.length}</p>
                        <div className="items-tags">
                          {orderItems.slice(0, 3).map((item, idx) => (
                            <span key={idx} className="item-tag">
                              {item.name} (x{item.quantity})
                            </span>
                          ))}
                          {orderItems.length > 3 && (
                            <span className="item-tag">
                              +{orderItems.length - 3} more
                            </span>
                          )}
                        </div>
                      </div>
                      
                      <div className="order-footer">
                        <span className="order-total">
                          ${(order.totalPrice || order.totalAmount || 0).toFixed(2)}
                        </span>
                        <div className="order-actions">
                          <button
                            onClick={() => setCurrentPage('track-order')}
                            className="track-button"
                          >
                            Track Order
                          </button>
                          {(order.orderStatus === 'pending' || order.orderStatus === 'confirmed') && (
                            <button
                              onClick={() => handleCancelOrder(order._id)}
                              className="cancel-order-button"
                            >
                              Cancel
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};