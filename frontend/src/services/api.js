// src/services/api.js
const API_BASE_URL = 'http://localhost:5000/api';

// Helper function to handle API responses
const handleResponse = async (response) => {
  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.message || 'Something went wrong');
  }
  
  return data;
};

// Helper function to get auth headers
const getAuthHeaders = (token) => ({
  'Content-Type': 'application/json',
  ...(token && { 'Authorization': `Bearer ${token}` })
});

const api = {
  // ============ AUTH APIs ============
  register: async (userData) => {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    });
    return handleResponse(response);
  },

  login: async (credentials) => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials)
    });
    return handleResponse(response);
  },

  getMe: async (token) => {
    const response = await fetch(`${API_BASE_URL}/auth/me`, {
      headers: getAuthHeaders(token)
    });
    return handleResponse(response);
  },

  updateProfile: async (token, userData) => {
    const response = await fetch(`${API_BASE_URL}/auth/profile`, {
      method: 'PUT',
      headers: getAuthHeaders(token),
      body: JSON.stringify(userData)
    });
    return handleResponse(response);
  },

  changePassword: async (token, passwords) => {
    const response = await fetch(`${API_BASE_URL}/auth/change-password`, {
      method: 'PUT',
      headers: getAuthHeaders(token),
      body: JSON.stringify(passwords)
    });
    return handleResponse(response);
  },

  // ============ PRODUCT APIs ============
  getProducts: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    const url = queryString ? `${API_BASE_URL}/products?${queryString}` : `${API_BASE_URL}/products`;
    
    const response = await fetch(url);
    const data = await handleResponse(response);
    return data.data || data; // Handle both formats
  },

  getProduct: async (id) => {
    const response = await fetch(`${API_BASE_URL}/products/${id}`);
    const data = await handleResponse(response);
    return data.data;
  },

  getFeaturedProducts: async () => {
    const response = await fetch(`${API_BASE_URL}/products/featured`);
    const data = await handleResponse(response);
    return data.data || data;
  },

  getTrendingProducts: async () => {
    const response = await fetch(`${API_BASE_URL}/products/trending`);
    const data = await handleResponse(response);
    return data.data || data;
  },

  addProductReview: async (token, productId, reviewData) => {
    const response = await fetch(`${API_BASE_URL}/products/${productId}/reviews`, {
      method: 'POST',
      headers: getAuthHeaders(token),
      body: JSON.stringify(reviewData)
    });
    return handleResponse(response);
  },

  createProduct: async (token, productData) => {
    const response = await fetch(`${API_BASE_URL}/products`, {
      method: 'POST',
      headers: getAuthHeaders(token),
      body: JSON.stringify(productData)
    });
    return handleResponse(response);
  },

  updateProduct: async (token, id, productData) => {
    const response = await fetch(`${API_BASE_URL}/products/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(token),
      body: JSON.stringify(productData)
    });
    return handleResponse(response);
  },

  deleteProduct: async (token, id) => {
    const response = await fetch(`${API_BASE_URL}/products/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(token)
    });
    return handleResponse(response);
  },

  uploadProductImages: async (token, productId, formData) => {
    const response = await fetch(`${API_BASE_URL}/products/${productId}/upload`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: formData
    });
    return handleResponse(response);
  },

  // ============ ORDER APIs (🔒 NOW PROTECTED - Auth Required) ============
  
  // 🔒 Create Order - NOW REQUIRES AUTHENTICATION
  createOrder: async (orderData, token) => {
    const response = await fetch(`${API_BASE_URL}/orders`, {
      method: 'POST',
      headers: getAuthHeaders(token),
      body: JSON.stringify(orderData)
    });
    return handleResponse(response);
  },

  // 🔒 Get Order by Number - NOW REQUIRES AUTHENTICATION
  getOrderByNumber: async (orderNumber, token) => {
    const response = await fetch(`${API_BASE_URL}/orders/track/${orderNumber}`, {
      headers: getAuthHeaders(token)
    });
    return handleResponse(response);
  },

  // 🔒 Get Order by ID - NOW REQUIRES AUTHENTICATION
  getOrderById: async (orderId, token) => {
    const response = await fetch(`${API_BASE_URL}/orders/${orderId}`, {
      headers: getAuthHeaders(token)
    });
    return handleResponse(response);
  },

  // 🔒 Get My Orders - User's own orders
  getMyOrders: async (token, params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    const url = queryString ? `${API_BASE_URL}/orders/myorders?${queryString}` : `${API_BASE_URL}/orders/myorders`;
    
    const response = await fetch(url, {
      headers: getAuthHeaders(token)
    });
    const data = await handleResponse(response);
    return data.data || data;
  },

  // 🔒 Cancel Order
  cancelOrder: async (token, id) => {
    const response = await fetch(`${API_BASE_URL}/orders/${id}/cancel`, {
      method: 'PUT',
      headers: getAuthHeaders(token)
    });
    return handleResponse(response);
  },

  // ============ ADMIN ORDER APIs (🔒 Admin Only) ============
  
  // 🔒 Get All Orders - Admin only
  getAllOrders: async (token) => {
    const response = await fetch(`${API_BASE_URL}/orders/admin/all`, {
      headers: getAuthHeaders(token)
    });
    return handleResponse(response);
  },

  getAdminOrders: async (token, params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    const url = queryString ? `${API_BASE_URL}/orders/admin/all?${queryString}` : `${API_BASE_URL}/orders/admin/all`;
    
    const response = await fetch(url, {
      headers: getAuthHeaders(token)
    });
    return handleResponse(response);
  },

  getOrderStats: async (token) => {
    const response = await fetch(`${API_BASE_URL}/orders/admin/stats`, {
      headers: getAuthHeaders(token)
    });
    return handleResponse(response);
  },

  updateOrderStatus: async (token, id, status) => {
    const response = await fetch(`${API_BASE_URL}/orders/${id}/status`, {
      method: 'PUT',
      headers: getAuthHeaders(token),
      body: JSON.stringify({ orderStatus: status })
    });
    return handleResponse(response);
  },

  updatePaymentStatus: async (token, id, status) => {
    const response = await fetch(`${API_BASE_URL}/orders/${id}/payment`, {
      method: 'PUT',
      headers: getAuthHeaders(token),
      body: JSON.stringify({ paymentStatus: status })
    });
    return handleResponse(response);
  }
};

export default api;