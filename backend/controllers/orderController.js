const Order = require('../models/Order');

// Create new order
exports.createOrder = async (req, res) => {
  try {
   const { customerName, address, contactInfo, items, status, amount, orderDate } = req.body;
   console.log('✅ POST /api/orders received:', req.body);


const newOrder = new Order({
  customerName,
  contactInfo,
  address,
  items,
  status,
  amount,
  orderDate,
  handledBy: req.user.id
});


    await newOrder.save();
    res.status(201).json({ message: 'Order created successfully', order: newOrder });
  } catch (err) {
    res.status(500).json({ message: 'Failed to create order', error: err.message });
  }
};

// Get all orders - for GM/admin
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('handledBy', 'name role');
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch orders', error: err.message });
  }
};

// Get orders for logged-in sales rep
exports.getMyOrders = async (req, res) => {
  try {
    const myOrders = await Order.find({ handledBy: req.user.id });
    res.status(200).json(myOrders);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch your orders', error: err.message });
  }
};

// Update order status
exports.updateOrderStatus = async (req, res) => {
  try {
    const updated = await Order.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    res.status(200).json({ message: 'Order status updated', order: updated });
  } catch (err) {
    res.status(500).json({ message: 'Failed to update order', error: err.message });
  }
};
