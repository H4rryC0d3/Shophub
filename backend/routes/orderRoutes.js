// backend/routes/orderRoutes.js
const express = require('express');
const router = express.Router();
const {
  createOrder,
  getOrder,
  getOrderByNumber,
  getMyOrders,
  getAllOrders,
  updateOrderStatus,
  cancelOrder,
  getOrderStats
} = require('../controllers/orderController');

// Import authentication middleware
const { protect, admin } = require('../middleware/authMiddleware');

// 🔒 PROTECTED routes - Authentication REQUIRED
router.post('/', protect, createOrder);  // Create order (must be logged in)
router.get('/myorders', protect, getMyOrders);  // Get user's orders
router.get('/track/:orderNumber', protect, getOrderByNumber);  // Track order
router.get('/:id', protect, getOrder);  // Get order by ID
router.put('/:id/cancel', protect, cancelOrder);  // Cancel order

// 🔒 ADMIN routes - Admin access only
router.get('/admin/all', protect, admin, getAllOrders);  // Get all orders
router.get('/admin/stats', protect, admin, getOrderStats);  // Order statistics
router.put('/:id/status', protect, admin, updateOrderStatus);  // Update order status

module.exports = router;