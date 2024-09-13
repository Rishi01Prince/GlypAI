const mongoose = require('mongoose');
const { Schema } = mongoose;

const VehicleSchema = new Schema({
  owneremail: {
    type: String,
    required: [true, "Owner Email is required"]
  },
  phone: {
    type: String,
    required: [true, "Phone Number is required"]
  },
  categoryName: {
    // Example: Electric, Truck, SUV, Sedan, etc.
    type: String,
    required: [true, "Category Name is required"]
  },
  name: {
    
    type: String,
    required: [true, "Name is required"]
  },
  options: {
    // Three options will be given: half day, full day, or sell
    type: [String],
    required: [true, "Options (Half Day, Full Day, Sell) are required"]
  },
  image: {
    type: String,
    required: [true, "Image is required"]
  },
  location: {
    // City or general location
    type: String,
    required: [true, "Location is required"]
  },
  pincode: {
    type: String,
    required: [true, "Pincode is required"]
  },
  availability: {
    type: Boolean,
    default: true
  },
  ownerPhone: {
    type: String,
    required: [true, "Owner Phone is required"]
  },
  halfDayPrice: {
    type: Number,
    required: [true, "Half Day Price is required"]
  },
  fullDayPrice: {
    type: Number,
    required: [true, "Full Day Price is required"]
  },
  year: {
    type: Number,
    required: [true, "Year of the vehicle is required"]
  },
  type: {
    
    type: String,
    required: [true, "Type of the vehicle is required"]
  }
});

module.exports = mongoose.model('Vehicles', VehicleSchema);
