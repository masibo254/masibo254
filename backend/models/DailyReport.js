const mongoose = require('mongoose');

const dailyReportSchema = new mongoose.Schema({
  reportDate: {
    type: Date,
    default: Date.now
  },
  noc: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  driver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  vehicle: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Vehicle',
    required: true
  },
  fleet: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Fleet',
    required: true
  },
  
  // Tracker data
  trackerMetrics: {
    totalDistance: Number,
    averageSpeed: Number,
    maxSpeed: Number,
    speedingIncidents: {
      count: Number,
      duration: Number,
      severity: String
    },
    harshAcceleration: Number,
    harshBraking: Number,
    fuelConsumption: Number,
    idleTime: Number,
    engineHours: Number,
    gpsCoverage: Number
  },
  
  // Dashcam analysis
  dashcamAnalysis: {
    videoDuration: Number,
    incidentsDetected: [{
      type: String,
      timestamp: Date,
      severity: String,
      description: String
    }],
    driverBehavior: [{
      type: String,
      timestamp: Date,
      duration: Number
    }],
    roadTraffic: {
      congestion: String,
      averageTrafficSpeed: Number
    },
    weather: String,
    roadConditions: String
  },
  
  // Compliance metrics
  complianceMetrics: {
    speedLimitCompliance: Number,
    trafficLightCompliance: Number,
    seatBeltUsage: Boolean,
    distanceWithinLimit: Boolean,
    safetyScore: Number
  },
  
  // Behavioral observations
  behaviors: {
    positive: [String],
    negative: [String],
    recommendations: [String]
  },
  
  // Incidents and violations
  incidents: [{
    type: String,
    timestamp: Date,
    severity: String,
    description: String,
    evidence: String
  }],
  
  violations: [{
    type: String,
    count: Number,
    details: String
  }],
  
  // Overall rating
  dailyRating: {
    type: Number,
    min: 0,
    max: 5,
    required: true
  },
  
  // NOC notes and comments
  nocNotes: String,
  flaggedForReview: {
    type: Boolean,
    default: false
  },
  reviewPriority: {
    type: String,
    enum: ['low', 'medium', 'high', 'critical'],
    default: 'low'
  },
  
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('DailyReport', dailyReportSchema);