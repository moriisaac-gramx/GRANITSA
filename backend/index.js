// Load environment variables
require('dotenv').config();
console.log('🔐 JWT Secret from dotenv:', process.env.JWT_SECRET);

// Core imports
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Route imports
const authRoutes = require('./routes/authRoutes.js');
console.log('✅ authRoutes loaded:', typeof authRoutes);

const orderRoutes = require('./routes/orderRoutes.js');
console.log('✅ orderRoutes loaded:', typeof orderRoutes);

const inventoryRoutes = require('./routes/inventoryRoutes.js');
console.log('✅ inventoryRoutes loaded:', typeof inventoryRoutes);

const dashboardRoutes = require('./routes/dashboardRoutes.js');
console.log('✅ dashboardRoutes loaded:', typeof dashboardRoutes);

const lpoRoutes = require('./routes/lpoRoutes.js');
console.log('✅ lpoRoutes loaded:', typeof lpoRoutes);

const userRoutes = require('./routes/userRoutes.js');
console.log('✅ userRoutes loaded:', typeof userRoutes);

// Create Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Route mounts
console.log('🚀 Mounting all API routes...');
// app.use('/api/auth', authRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/inventory', inventoryRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/lpos', lpoRoutes);
app.use('/api/users', userRoutes);

// Test route
app.get('/ping', (req, res) => res.send('Backend is working! 💚'));

// Catch unmatched routes
app.all('*', (req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/granitsa', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
