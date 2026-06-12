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
  trip: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Trip'
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
  speedViolationDuration: Number, // in seconds
  
  // Acceleration and braking
  acceleration: Number, // g-force
  harshAccelerationDetected: Boolean,
  
  braking: Number, // g-force
  harshBrakingDetected: Boolean,
  
  // Engine and fuel
  engineStatus: String,
  engineRPM: Number,
  fuelLevel: Number,
  fuelConsumption: Number, // liters
  
  // Vehicle parameters
  odometer: Number,
  engineHours: Number,
  temperature: {
    engine: Number,
    cabin: Number
  },
  
  // Tire pressure
  tirePressure: {
    frontLeft: Number,
    frontRight: Number,
    rearLeft: Number,
    rearRight: Number
  },
  
  // Alerts and warnings
  alerts: [{
    type: String,
    severity: String, // low, medium, high, critical
    message: String,
    timestamp: Date
  }],
  
  // Trip-related data
  tripDistance: Number,
  tripDuration: Number,
  idleTime: Number,
  
  // Environmental conditions
  weather: String,
  roadCondition: String,
  traffic: String, // light, moderate, heavy
  
  // Timestamp
  timestamp: {
    type: Date,
    default: Date.now,
    index: true
  },
  
  // GPS accuracy
  gpsQuality: {
    satellites: Number,
    hdop: Number // Horizontal Dilution of Precision
  }
});

module.exports = mongoose.model('TrackerData', trackerDataSchema);
