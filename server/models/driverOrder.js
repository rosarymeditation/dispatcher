const mongoose = require("mongoose");

const driverOrderSchema = new mongoose.Schema({
  driver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Driver",
    required: true,
  },
  order: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Order",
    required: true,
  },
  status: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Status",
    required: true,
  },
});

const DriverOrder = mongoose.model("DriverOrder", driverOrderSchema);

module.exports = DriverOrder;
