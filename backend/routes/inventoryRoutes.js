const express = require('express');
const router = express.Router();
const { authenticate, authorize } = require('../middleware/authMiddleware');
const inventoryController = require('../controllers/inventoryController');

// View inventory
router.get('/', authenticate, authorize('warehouseStaff', 'generalManager'), inventoryController.getInventory);

// Add item
router.post('/', authenticate, authorize('warehouseStaff'), inventoryController.addItem);

// Update item
router.put('/:id', authenticate, authorize('warehouseStaff'), inventoryController.updateItem);

// Delete item
router.delete('/:id', authenticate, authorize('warehouseStaff'), inventoryController.deleteItem);

module.exports = router;
