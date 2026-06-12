const express = require('express');
const router = express.Router();
const Driver = require('../models/Driver');

// Get all drivers
router.get('/', async (req, res) => {
  try {
    const drivers = await Driver.find().populate('assignedVehicle');
    res.json(drivers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add new driver
router.post('/', async (req, res) => {
  const driver = new Driver(req.body);
  try {
    const newDriver = await driver.save();
    res.status(201).json(newDriver);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get specific driver
router.get('/:id', async (req, res) => {
  try {
    const driver = await Driver.findById(req.params.id).populate('assignedVehicle');
    if (!driver) return res.status(404).json({ message: 'Driver not found' });
    res.json(driver);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update driver
router.put('/:id', async (req, res) => {
  try {
    const driver = await Driver.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(driver);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete driver
router.delete('/:id', async (req, res) => {
  try {
    await Driver.findByIdAndDelete(req.params.id);
    res.json({ message: 'Driver deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
