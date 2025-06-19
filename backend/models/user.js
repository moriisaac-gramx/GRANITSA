const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ['generalManager', 'warehouseStaff', 'salesRep', 'admin'],
      default: 'salesRep'
    }
  },
  { timestamps: true } // ✅ Adds createdAt and updatedAt fields
);

module.exports = mongoose.model('User', userSchema);
