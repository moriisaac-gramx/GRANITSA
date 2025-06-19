// ROUTES/authRoutes.js
const express = require('express');
const router = express.Router();

// 🔧 Corrected: import actual controller functions
const { signupUser, login } = require('../controllers/authcontroller');

// 🔧 Updated: Route now uses signup controller logic
router.post('/signup', signupUser);

// 🔧 Updated: Hooked in real login controller as well
router.post('/login', login);

module.exports = router;
