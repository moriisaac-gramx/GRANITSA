const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, enum: ['cleaning', 'sanitation', 'foodSafety', 'infectionControl', 'treatmentChemical'], required: true },
  quantity: { type: Number, required: true },
  unit: { type: String, default: 'pcs' },
  supplier: { type: String },
  reorderLevel: { type: Number, default: 10 },
  lastUpdated: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Inventory', inventorySchema);
