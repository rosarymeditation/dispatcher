const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  orderNumber: { type: String },
  address: { type: String },
  postCode: { type: String },
  lon: { type: String },
  lat: { type: String },
  customerLon: { type: String },
  customerLat: { type: String },
  customerPhone: { type: String },
  createdTime: { type: Date },
  entryDate: { type: String },
  expectedTime: { type: Date },
  amount: { type: String },
  acceptedTime: { type: Date },
  deliveryTime: { type: Date },
  customerName: { type: String },
  driverEmail: { type: String },
  createdAt: { type: Date, default: Date.now },
  status: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Status",
  },
  restaurant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Restaurant",
  },
  driver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Driver",
  },
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
