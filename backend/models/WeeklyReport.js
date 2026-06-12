const mongoose = require('mongoose');

const weeklyReportSchema = new mongoose.Schema({
  weekStartDate: {
    type: Date,
    required: true
  },
  weekEndDate: {
    type: Date,
    required: true
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
  fleet: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Fleet',
    required: true
  },
  
  // Weekly aggregated metrics
  weeklyMetrics: {
    totalDistance: Number,
    totalTrips: Number,
    totalHours: Number,
    averageSpeed: Number,
    maxSpeed: Number,
    totalSpeedingIncidents: Number,
    totalHarshAcceleration: Number,
    totalHarshBraking: Number,
    totalFuelConsumption: Number,
    averageFuelEfficiency: Number,
    totalIdleTime: Number
  },
  
  // Compliance summary
  complianceSummary: {
    speedLimitCompliance: Number,
    trafficLawCompliance: Number,
    safetyProtocolCompliance: Number,
    vehicleMaintenanceCompliance: Boolean,
    documentationCompliance: Boolean,
    overallComplianceScore: Number
  },
  
  // Behavior analysis
  behaviorAnalysis: {
    totalIncidents: Number,
    incidentsByType: {
      speeding: Number,
      harshBraking: Number,
      harshAcceleration: Number,
      distractedDriving: Number,
      laneViolations: Number,
      other: Number
    },
    totalViolations: Number,
    violationsByType: [{
      type: String,
      count: Number
    }],
    positiveObservations: [String],
    areasForImprovement: [String]
  },
  
  // Safety metrics
  safetyMetrics: {
    safetyScore: Number,
    riskLevel: {
      type: String,
      enum: ['low', 'medium', 'high', 'critical'],
      default: 'low'
    },
    nearMissIncidents: Number,
    accidentsOrDamages: Number,
    insuranceClaims: Number,
    safetyTrend: String
  },
  
  // Recommendations
  recommendations: [{
    category: String,
    priority: {
      type: String,
      enum: ['low', 'medium', 'high', 'critical'],
      default: 'medium'
    },
    description: String,
    suggestedAction: String,
    deadline: Date
  }],
  
  // NOC summary and approval
  nocSummary: String,
  approvedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  approvalDate: Date,
  status: {
    type: String,
    enum: ['draft', 'pending_review', 'approved', 'archived'],
    default: 'draft'
  },
  
  createdAt: {
    type: Date,
    default: Date.now
  },
  
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('WeeklyReport', weeklyReportSchema);