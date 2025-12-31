import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Package, ShoppingCart, Users, DollarSign, TrendingUp, Plus } from 'lucide-react';
import api from '../services/api';
import '../styles/AdminDashboard.css';

export const AdminDashboardPage = ({ setCurrentPage }) => {
  const { user, token } = useContext(AuthContext);
  const [stats, setStats] = useState(null);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    if (user && user.role === 'admin') {
      fetchDashboardData();
    }
  }, [user, token]);

  const fetchDashboardData = async () => {
    try {
      const [statsData, productsData, ordersData] = await Promise.all([
        api.getOrderStats(token),
        api.getProducts(),
        api.getAllOrders(token, { limit: 10 })
      ]);

      setStats(statsData.data);
      setProducts(Array.isArray(productsData) ? productsData : []);
      setOrders(Array.isArray(ordersData.data) ? ordersData.data : []);
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateOrderStatus = async (orderId, status) => {
    try {
      await api.updateOrderStatus(token, orderId, status);
      fetchDashboardData();
    } catch (error) {
      console.error('Failed to update order status:', error);
    }
  };

  if (!user || user.role !== 'admin') {
    return (
      <div className="access-denied-container">
        <h2 className="access-denied-title">Access Denied</h2>
        <p className="access-denied-text">You don't have permission to view this page</p>
        <button
          onClick={() => setCurrentPage('home')}
          className="access-denied-button"
        >
          Go Home
        </button>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-text">Loading dashboard...</div>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      <h1 className="dashboard-title">Admin Dashboard</h1>

      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card stat-card-blue">
          <div className="stat-card-header">
            <ShoppingCart size={32} />
            <TrendingUp size={20} />
          </div>
          <p className="stat-label">Total Orders</p>
          <p className="stat-value">{stats?.totalOrders || 0}</p>
        </div>

        <div className="stat-card stat-card-green">
          <div className="stat-card-header">
            <DollarSign size={32} />
            <TrendingUp size={20} />
          </div>
          <p className="stat-label">Total Revenue</p>
          <p className="stat-value">${stats?.totalRevenue?.toFixed(2) || '0.00'}</p>
        </div>

        <div className="stat-card stat-card-purple">
          <div className="stat-card-header">
            <Package size={32} />
            <TrendingUp size={20} />
          </div>
          <p className="stat-label">Total Products</p>
          <p className="stat-value">{products.length}</p>
        </div>

        <div className="stat-card stat-card-orange">
          <div className="stat-card-header">
            <Users size={32} />
            <TrendingUp size={20} />
          </div>
          <p className="stat-label">Pending Orders</p>
          <p className="stat-value">{stats?.pendingOrders || 0}</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="tabs-container">
        <div className="tabs-header">
          <button
            onClick={() => setActiveTab('overview')}
            className={`tab-button ${activeTab === 'overview' ? 'tab-button-active' : ''}`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('products')}
            className={`tab-button ${activeTab === 'products' ? 'tab-button-active' : ''}`}
          >
            Products
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`tab-button ${activeTab === 'orders' ? 'tab-button-active' : ''}`}
          >
            Orders
          </button>
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div className="tab-content">
          <h2 className="content-title">Recent Orders</h2>
          {stats?.recentOrders && stats.recentOrders.length > 0 ? (
            <div className="orders-list">
              {stats.recentOrders.map((order) => (
                <div key={order._id} className="order-card">
                  <div className="order-card-content">
                    <div className="order-info">
                      <p className="order-id">Order #{order._id.slice(-8)}</p>
                      <p className="order-user">{order.user.name} - {order.user.email}</p>
                    </div>
                    <span className="order-amount">${order.totalAmount.toFixed(2)}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="empty-state">No recent orders</p>
          )}
        </div>
      )}

      {activeTab === 'products' && (
        <div className="tab-content">
          <div className="content-header">
            <h2 className="content-title">Products Management</h2>
            <button className="add-button">
              <Plus size={20} />
              Add Product
            </button>
          </div>
          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Stock</th>
                  <th>Category</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.slice(0, 10).map((product) => (
                  <tr key={product._id}>
                    <td>{product.name}</td>
                    <td>${product.price}</td>
                    <td>{product.stock}</td>
                    <td>{product.category}</td>
                    <td>
                      <button className="action-button action-edit">Edit</button>
                      <button className="action-button action-delete">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'orders' && (
        <div className="tab-content">
          <h2 className="content-title">Orders Management</h2>
          <div className="orders-list">
            {orders.map((order) => (
              <div key={order._id} className="order-card order-card-detailed">
                <div className="order-card-content">
                  <div className="order-info">
                    <p className="order-id">Order #{order._id.slice(-8)}</p>
                    <p className="order-user">{order.user.name} - {order.user.email}</p>
                    <p className="order-items">{order.items.length} items</p>
                  </div>
                  <div className="order-actions">
                    <p className="order-amount-large">${order.totalAmount.toFixed(2)}</p>
                    <select
                      value={order.orderStatus}
                      onChange={(e) => handleUpdateOrderStatus(order._id, e.target.value)}
                      className="status-select"
                    >
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};