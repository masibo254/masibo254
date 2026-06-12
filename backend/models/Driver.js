const mongoose = require('mongoose');

const driverSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  phone: {
    type: String,
    required: true
  },
  licenseNumber: {
    type: String,
    required: true,
    unique: true
  },
  licenseExpiry: Date,
  licenseClass: String,
  dateOfBirth: Date,
  address: String,
  city: String,
  state: String,
  zipCode: String,
  assignedVehicle: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Vehicle'
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'on-leave', 'suspended'],
    default: 'active'
  },
  totalTrips: {
    type: Number,
    default: 0
  },
  totalDistance: {
    type: Number,
    default: 0
  },
  safetyRating: {
    type: Number,
    min: 0,
    max: 5,
    default: 5
  },
  violations: [{
    date: Date,
    description: String,
    severity: String
  }],
  emergencyContact: {
    name: String,
    phone: String,
    relationship: String
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

module.exports = mongoose.model('Driver', driverSchema);
