const mongoose = require("mongoose");

const statusSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  display: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
});

const Status = mongoose.model("Status", statusSchema);

module.exports = Status;
