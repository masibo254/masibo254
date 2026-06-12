const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
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
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  phone: String,
  avatar: String,
  
  // Role-based access control
  role: {
    type: String,
    enum: ['driver', 'fleet_noc', 'fleet_manager', 'admin'],
    required: true
  },
  
  // Fleet association
  fleetId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Fleet'
  },
  
  // Driver specific fields
  driverDetails: {
    licenseNumber: String,
    licenseExpiry: Date,
    licenseClass: String,
    dateOfBirth: Date,
    address: String,
    city: String,
    state: String,
    zipCode: String,
    emergencyContact: {
      name: String,
      phone: String,
      relationship: String
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
    }]
  },
  
  // Fleet NOC specific fields
  nocDetails: {
    department: String,
    assignedRegion: String,
    vehiclesMonitored: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Vehicle'
    }],
    driversMonitored: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }],
    reportFrequency: {
      type: String,
      enum: ['daily', 'weekly', 'bi-weekly', 'monthly'],
      default: 'daily'
    }
  },
  
  // Fleet Manager specific fields
  managerDetails: {
    department: String,
    permission: [String] // ['manage_drivers', 'manage_vehicles', 'manage_noc', etc]
  },
  
  // Account status
  status: {
    type: String,
    enum: ['active', 'inactive', 'suspended', 'on-leave'],
    default: 'active'
  },
  
  isVerified: {
    type: Boolean,
    default: false
  },
  
  lastLogin: Date,
  
  createdAt: {
    type: Date,
    default: Date.now
  },
  
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

// Compare password method
userSchema.methods.comparePassword = async function(password) {
  return await bcrypt.compare(password, this.password);
};

// Remove password from response
userSchema.methods.toJSON = function() {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

module.exports = mongoose.model('User', userSchema);