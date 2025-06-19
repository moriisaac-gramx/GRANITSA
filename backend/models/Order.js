const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
  {
    customerName: { type: String, required: true },
    contactInfo: { type: String, required: true },
    address: { type: String },
    items: [
      {
        name: { type: String, required: true },
        quantity: { type: Number, required: true },
        unit: { type: String, default: 'pcs' },
        price: { type: Number, required: true }
      }
    ],
    amount: { type: Number, required: true },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'fulfilled'],
      default: 'pending'
    },
    orderDate: { type: Date, default: Date.now },
    handledBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Order', orderSchema);
