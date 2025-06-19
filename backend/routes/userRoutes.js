const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.get('/active', async (req, res) => {
  try {
    const users = await User.find({}, 'name role'); // include 'lastActive' if you track it
    res.json(users);
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

module.exports = router;
