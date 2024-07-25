const Order = require("../models/order");
const Status = require("../models/status");
const { upload } = require("../utility/global");

const { SERVER_ERROR, OK } = require("../errors/statusCode");
module.exports = {
  create: async (req, res) => {
    try {
      const { name, display } = req.body;

      const data = Status({
        name,
        display,
      });

      await data.save();
      return res.status(OK).send({ error: false });
    } catch (err) {
      return res.status(SERVER_ERROR).send({ error: true });
    }
  },
};
