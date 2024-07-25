const DriverOrder = require("../models/driverOrder");
const Driver = require("../models/driver");
const Order = require("../models/order");
const { upload } = require("../utility/global");

const {
  SERVER_ERROR,
  OK,
  VALIDATION_ERROR,
  Messages,
} = require("../errors/statusCode");
const driver = require("./driver");
// const query = new Query(PostCode);

module.exports = {
  create: async (req, res) => {
    try {
      const { driverId, orderId, status } = req.body;

      const data = DriverOrder({ driver: driverId, order: orderId, status });
      await data.save();
      return res.status(OK).send({ error: false });
    } catch (err) {
      return res.status(SERVER_ERROR).send({ error: true });
    }
  },

  delete: async (req, res) => {
    try {
      const id = req.params.id;
      const data = await DriverOrder.findByIdAndDelete(id);
      return res.status(OK).send({ error: false });
    } catch (err) {
      return res.status(SERVER_ERROR).send({ error: true, message: err });
    }
  },

  update: async (req, res) => {
    try {
      const id = req.params.id;

      const body = req.body;

      const options = { new: true };

      const result = await DriverOrder.findByIdAndUpdate(id, body, options);

      return res.status(OK).send({ error: false, result });
    } catch (err) {
      return res.status(SERVER_ERROR).send({ error: true, message: err });
    }
  },
};
