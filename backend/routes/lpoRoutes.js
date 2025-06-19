const express = require('express');
const router = express.Router();
const Lpo = require('../models/Lpo'); // 👉 Your MongoDB model

router.get('/', async (req, res) => {
  try {
    const lpos = await Lpo.find().sort({ issuedDate: -1 });
    res.json(lpos);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch LPOs' });
  }
});

router.post('/', async (req, res) => {
  try {
    const { supplier, items } = req.body;

    const issuedDate = new Date();
    const randomNum = Math.floor(Math.random() * 100000);
    const lpoId = `LPO-${issuedDate.getFullYear()}${(issuedDate.getMonth() + 1)
      .toString()
      .padStart(2, '0')}${issuedDate.getDate().toString().padStart(2, '0')}-${randomNum}`;

    const newLpo = await Lpo.create({
      lpoId,
      supplier,
      client: supplier,
      items,
      issuedDate
    });

    res.status(201).json(newLpo);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: 'Failed to create LPO' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await Lpo.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete LPO' });
  }
});

module.exports = router;
