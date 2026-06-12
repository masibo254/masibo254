const express = require('express');
const router = express.Router();
const DailyReport = require('../models/DailyReport');
const WeeklyReport = require('../models/WeeklyReport');
const TrackerData = require('../models/TrackerData');
const User = require('../models/User');
const Vehicle = require('../models/Vehicle');
const jwt = require('jsonwebtoken');

// Middleware to authenticate
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Access token required' });
  
  jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret_key', (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid token' });
    req.userId = user.userId;
    req.role = user.role;
    next();
  });
}

// Get NOC Dashboard Overview
router.get('/dashboard', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (user.role !== 'fleet_noc' && user.role !== 'fleet_manager' && user.role !== 'admin') {
      return res.status(403).json({ message: 'Unauthorized' });
    }
    
    const fleetId = user.fleetId;
    
    // Get today's reports
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const todayReports = await DailyReport.find({
      fleet: fleetId,
      reportDate: { $gte: today }
    }).populate('driver vehicle');
    
    // Get vehicles
    const vehicles = await Vehicle.find({ _id: { $in: user.nocDetails?.vehiclesMonitored || [] } });
    
    // Get latest tracker data for all vehicles
    const trackerData = await TrackerData.find({
      vehicle: { $in: vehicles.map(v => v._id) }
    }).sort({ timestamp: -1 }).limit(vehicles.length);
    
    // Calculate metrics
    const totalDriversMonitored = user.nocDetails?.driversMonitored?.length || 0;
    const vehiclesMonitored = vehicles.length;
    const reportsCompleted = todayReports.length;
    const averageSafetyScore = todayReports.length > 0
      ? (todayReports.reduce((sum, r) => sum + (r.dailyRating || 0), 0) / todayReports.length).toFixed(2)
      : 0;
    
    res.json({
      summary: {
        totalDriversMonitored,
        vehiclesMonitored,
        reportsCompleted,
        averageSafetyScore
      },
      todayReports,
      trackerData,
      vehicles
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get real-time vehicle tracking
router.get('/tracking/:vehicleId', authenticateToken, async (req, res) => {
  try {
    const trackerData = await TrackerData.findOne({
      vehicle: req.params.vehicleId
    }).sort({ timestamp: -1 });
    
    if (!trackerData) {
      return res.status(404).json({ message: 'No tracking data found' });
    }
    
    res.json(trackerData);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get driver daily report
router.get('/daily-report/:driverId', authenticateToken, async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const report = await DailyReport.findOne({
      driver: req.params.driverId,
      reportDate: { $gte: today }
    }).populate('driver vehicle');
    
    if (!report) {
      return res.status(404).json({ message: 'No report found for today' });
    }
    
    res.json(report);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create daily report
router.post('/daily-report', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (user.role !== 'fleet_noc' && user.role !== 'fleet_manager') {
      return res.status(403).json({ message: 'Unauthorized' });
    }
    
    const dailyReport = new DailyReport({
      ...req.body,
      noc: req.userId,
      fleet: user.fleetId
    });
    
    await dailyReport.save();
    res.status(201).json(dailyReport);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get weekly report
router.get('/weekly-report/:driverId/:weekStartDate', authenticateToken, async (req, res) => {
  try {
    const report = await WeeklyReport.findOne({
      driver: req.params.driverId,
      weekStartDate: new Date(req.params.weekStartDate)
    }).populate('driver vehicle');
    
    if (!report) {
      return res.status(404).json({ message: 'No weekly report found' });
    }
    
    res.json(report);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create weekly report
router.post('/weekly-report', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (user.role !== 'fleet_noc' && user.role !== 'fleet_manager') {
      return res.status(403).json({ message: 'Unauthorized' });
    }
    
    const weeklyReport = new WeeklyReport({
      ...req.body,
      noc: req.userId,
      fleet: user.fleetId
    });
    
    await weeklyReport.save();
    res.status(201).json(weeklyReport);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get all drivers for NOC
router.get('/drivers', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    const drivers = await User.find({
      fleetId: user.fleetId,
      role: 'driver',
      status: 'active'
    });
    
    res.json(drivers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;