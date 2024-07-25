const Order = require("../models/order");
const DriverStatus = require("../models/driverStatus");
const { upload } = require("../utility/global");

const { SERVER_ERROR, OK } = require("../errors/statusCode");
module.exports = {
  create: async (req, res) => {
    try {
      const { name } = req.body;

      const data = DriverStatus({
        name,
      });

      await data.save();
      return res.status(OK).send({ error: false });
    } catch (err) {
      return res.status(SERVER_ERROR).send({ error: true });
    }
  },
};
