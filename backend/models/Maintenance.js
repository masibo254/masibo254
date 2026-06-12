const mongoose = require('mongoose');

const maintenanceSchema = new mongoose.Schema({
  vehicle: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Vehicle',
    required: true
  },
  maintenanceType: {
    type: String,
    enum: ['routine', 'preventive', 'corrective', 'inspection'],
    required: true
  },
  description: String,
  scheduledDate: Date,
  completedDate: Date,
  status: {
    type: String,
    enum: ['scheduled', 'in-progress', 'completed', 'cancelled'],
    default: 'scheduled'
  },
  estimatedCost: Number,
  actualCost: Number,
  mileageAtMaintenance: Number,
  serviceProvider: String,
  notes: String,
  parts: [{
    name: String,
    quantity: Number,
    cost: Number
  }],
  technician: String,
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Maintenance', maintenanceSchema);
