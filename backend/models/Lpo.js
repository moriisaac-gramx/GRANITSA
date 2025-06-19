const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  name: String,
  quantity: Number
});

const lpoSchema = new mongoose.Schema({
  lpoId: String,
  supplier: String,
  client: String,
  items: [itemSchema],
  issuedDate: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Lpo', lpoSchema);
