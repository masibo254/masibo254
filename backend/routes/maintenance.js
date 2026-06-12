const express = require('express');
const router = express.Router();
const Maintenance = require('../models/Maintenance');

// Get all maintenance records
router.get('/', async (req, res) => {
  try {
    const records = await Maintenance.find().populate('vehicle');
    res.json(records);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Schedule maintenance
router.post('/', async (req, res) => {
  const maintenance = new Maintenance(req.body);
  try {
    const newRecord = await maintenance.save();
    res.status(201).json(newRecord);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update maintenance record
router.put('/:id', async (req, res) => {
  try {
    const record = await Maintenance.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(record);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
