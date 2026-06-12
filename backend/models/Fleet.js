const mongoose = require('mongoose');

const fleetSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  companyName: String,
  description: String,
  
  // Fleet administration
  admin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  
  // Members
  drivers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  
  nocPersonnel: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  
  managers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  
  // Vehicles
  vehicles: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Vehicle'
  }],
  
  // Location
  headquarters: {
    address: String,
    city: String,
    state: String,
    country: String,
    zipCode: String,
    coordinates: {
      latitude: Number,
      longitude: Number
    }
  },
  
  // Contact information
  contactPerson: {
    name: String,
    email: String,
    phone: String,
    position: String
  },
  
  // Fleet statistics
  statistics: {
    totalVehicles: Number,
    activeVehicles: Number,
    totalDrivers: Number,
    averageFleetAge: Number,
    totalAnnualDistance: Number,
    averageFuelConsumption: Number
  },
  
  // Policies and standards
  policies: {
    speedLimit: Number,
    safetyStandards: [String],
    maintenanceSchedule: String,
    drivingHours: {
      maxPerDay: Number,
      maxPerWeek: Number
    }
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

module.exports = mongoose.model('Fleet', fleetSchema);