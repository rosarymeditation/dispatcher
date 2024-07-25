const mongoose = require("mongoose");

const driverStatusSchema = new mongoose.Schema({
  name: { type: String },
});

const DriverStatus = mongoose.model("DriverStatus", driverStatusSchema);

module.exports = DriverStatus;
