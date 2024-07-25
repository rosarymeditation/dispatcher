const mongoose = require("mongoose");

const driverSchema = new mongoose.Schema({
  firstName: { type: String },
  lastName: { type: String },
  email: { type: String },
  phone: { type: String },
  password: { type: String },
  lon: { type: String },
  lat: { type: String },
  isOnline: { type: Boolean, default: false },
  driverStatus: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "DriverStatus",
  },
  createdAt: { type: Date, default: Date.now },
});

const Driver = mongoose.model("Driver", driverSchema);

module.exports = Driver;
