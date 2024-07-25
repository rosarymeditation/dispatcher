const mongoose = require("mongoose");

const restaurantSchema = new mongoose.Schema({
  name: { type: String },
  refNo: { type: String },
  display: { type: String },
  email: { type: String },
  phone: { type: String },
  address: { type: String },
  postCode: { type: String },
  lon: { type: String },
  lat: { type: String },

  // user: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "User",
  //   required: true,
  // },
});

const Restaurant = mongoose.model("Restaurant", restaurantSchema);

module.exports = Restaurant;
