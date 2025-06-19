const Inventory = require('../models/Inventory');

exports.getInventory = async (req, res) => {
  try {
    const items = await Inventory.find();
    res.status(200).json(items);
  } catch (err) {
    res.status(500).json({ message: 'Failed to retrieve inventory', error: err.message });
  }
};

exports.addItem = async (req, res) => {
  try {
    const newItem = new Inventory(req.body);
    await newItem.save();
    res.status(201).json({ message: 'Item added', item: newItem });
  } catch (err) {
    res.status(500).json({ message: 'Failed to add item', error: err.message });
  }
};

exports.updateItem = async (req, res) => {
  try {
    const updatedItem = await Inventory.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json({ message: 'Item updated', item: updatedItem });
  } catch (err) {
    res.status(500).json({ message: 'Failed to update item', error: err.message });
  }
};

exports.deleteItem = async (req, res) => {
  try {
    await Inventory.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Item deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete item', error: err.message });
  }
};
