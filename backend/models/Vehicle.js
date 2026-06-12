const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
  registrationNumber: {
    type: String,
    required: true,
    unique: true
  },
  make: {
    type: String,
    required: true
  },
  model: {
    type: String,
    required: true
  },
  year: {
    type: Number,
    required: true
  },
  color: String,
  vin: {
    type: String,
    unique: true
  },
  mileage: {
    type: Number,
    default: 0
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'maintenance', 'retired'],
    default: 'active'
  },
  assignedDriver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Driver'
  },
  fuelType: {
    type: String,
    enum: ['petrol', 'diesel', 'electric', 'hybrid'],
    required: true
  },
  fuelCapacity: Number,
  currentFuel: Number,
  gpsDevice: {
    deviceId: String,
    isActive: Boolean
  },
  lastMaintenanceDate: Date,
  nextMaintenanceDate: Date,
  purchaseDate: Date,
  insuranceExpiryDate: Date,
  registrationExpiryDate: Date,
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Vehicle', vehicleSchema);
