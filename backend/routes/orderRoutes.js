const express = require('express');
const router = express.Router();
const { authenticate, authorize } = require('../middleware/authMiddleware');
const orderController = require('../controllers/orderController');


// Sales rep creates an order
router.post('/', authenticate, authorize('salesRep'), orderController.createOrder);

// Sales rep views their own orders
router.get('/my-orders', authenticate, authorize('salesRep'), orderController.getMyOrders);

// GM or Admin views all orders
router.get('/', authenticate, authorize('generalManager', 'admin'), orderController.getAllOrders);

// Update order status (for admin, GM or future logistics role)
router.put('/:id', authenticate, authorize('generalManager', 'admin'), orderController.updateOrderStatus);

module.exports = router;
