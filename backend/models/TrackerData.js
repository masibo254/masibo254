const mongoose = require('mongoose');

const trackerDataSchema = new mongoose.Schema({
  vehicle: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Vehicle',
    required: true
  },
  driver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  
  // Location data
  location: {
    latitude: {
      type: Number,
      required: true
    },
    longitude: {
      type: Number,
      required: true
    },
    altitude: Number,
    accuracy: Number
  },
  
  // Speed and movement
  speed: {
    current: Number,
    average: Number,
    max: Number
  },
  
  speedingDetected: {
    type: Boolean,
    default: false
  },
  
  speedLimit: Number,
  speedViolationDuration: Number,
  
  // Acceleration and braking
  acceleration: Number,
  harshAccelerationDetected: Boolean,
  
  braking: Number,
  harshBrakingDetected: Boolean,
  
  // Engine and fuel
  engineStatus: String,
  engineRPM: Number,
  fuelLevel: Number,
  fuelConsumption: Number,
  
  // Vehicle parameters
  odometer: Number,
  engineHours: Number,
  temperature: {
    engine: Number,
    cabin: Number
  },
  
  // Alerts and warnings
  alerts: [{
    type: String,
    severity: String,
    message: String,
    timestamp: Date
  }],
  
  // Timestamp
  timestamp: {
    type: Date,
    default: Date.now,
    index: true
  }
});

module.exports = mongoose.model('TrackerData', trackerDataSchema);