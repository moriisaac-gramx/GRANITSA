const Inventory = require('../models/Inventory');
const Order = require('../models/Order');
const User = require('../models/User');

exports.getDashboard = async (req, res) => {
  try {
    const { role, id } = req.user;

    let data = {};

    if (role === 'generalManager') {
      const [totalInventory, totalOrders, totalConsults, totalUsers] = await Promise.all([
        Inventory.countDocuments(),
        Order.countDocuments(),
        User.countDocuments()
      ]);
      data = { totalInventory, totalOrders, totalConsults, totalUsers };

    } else if (role === 'warehouseStaff') {
      const stockSummary = await Inventory.find().select('name quantity reorderLevel');
      data = { stockSummary };

    } else if (role === 'salesRep') {
      const myOrders = await Order.find({ handledBy: id }).select('customerName orderDate status');
      data = { myOrders };

    } else if (role === 'admin') {
      const recentUsers = await User.find().sort({ _id: -1 }).limit(5).select('name email role');
      data = { recentUsers };
    }

    res.status(200).json({ role, dashboard: data });

  } catch (err) {
    res.status(500).json({ message: 'Failed to load dashboard', error: err.message });
  }
};
