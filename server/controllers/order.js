const Order = require("../models/order");
const Status = require("../models/status");

const { upload } = require("../utility/global");

const {
  SERVER_ERROR,
  OK,
  VALIDATION_ERROR,
  Messages,
} = require("../errors/statusCode");
const driver = require("./driver");
const Driver = require("../models/driver");
// const query = new Query(PostCode);

module.exports = {
  create: async (req, res) => {
    try {
      const {
        orderNumber,
        address,
        amount,
        postCode,
        lon,
        lat,
        createdTime,
        expectedTime,
        acceptedTime,
        customerName,
        customerLon,
        customerLat,
        restaurant,
        customerPhone,
        deliveryTime,
      } = req.body;
      const findOrder = await Order.findOne({ orderNumber });
      if (findOrder) {
        return res.status(OK).send({ error: false });
      }
      const status = await Status.findOne({ name: "Pending" });
      const date = new Date();

      // Extract month and year
      const monthIndex = date.getMonth() + 1; // Zero-based index (0 = January, 1 = February, etc.)
      const day = date.getDate();
      const year = date.getFullYear(); // Four-digit year
      const data = Order({
        entryDate: `${day}-${monthIndex}-${year}`,
        orderNumber,
        address,
        postCode,
        lon,
        lat,
        amount,
        createdTime,
        expectedTime,
        acceptedTime,
        customerName,
        status: status._id,
        restaurant,
        customerLat,
        customerLon,
        customerPhone,
        deliveryTime,
      });

      await data.save();
      return res.status(OK).send({ error: false });
    } catch (err) {
      console.log(err);
      return res.status(SERVER_ERROR).send({ error: true });
    }
  },

  findAll: async (req, res) => {
    try {
      const date = req.body.date;

      const data = await Order.find({
        entryDate: date,
        status: {
          $nin: ["6622d36fc540830c9d300f7e", "666354cd98166c045dc587c0"],
        },
      })
        .populate("status")
        .populate("driver")
        .populate("restaurant");
      console.log(data);
      return res.status(OK).send({ data: data });
    } catch (err) {
      return res.status(OK).send({});
    }
  },

  findAllFinished: async (req, res) => {
    try {
      const date = req.body.date;

      const data = await Order.find({
        entryDate: date,
        status: {
          $in: ["6622d36fc540830c9d300f7e", "666354cd98166c045dc587c0"],
        },
      })
        .populate("status")
        .populate("driver")
        .populate("restaurant");
      console.log(data);
      return res.status(OK).send({ data: data });
    } catch (err) {
      return res.status(OK).send({});
    }
  },

  getOrderForDriver: async (req, res) => {
    try {
      const id = req.params.id;
      const data = await Order.find()
        .populate("status")
        .populate("driver")
        .populate("restaurant");
      return res.status(OK).send({ data: data });
    } catch (err) {
      return res.status(OK).send({});
    }
  },

  getAllOrderForDriverByEmail: async (req, res) => {
    try {
      const { email } = req.body;
      const data = await Order.find({
        driverEmail: email,
        status: {
          $nin: [
            "6662179c19bae377bce5e021",
            "6622d357c540830c9d300f7a",
            "666354cd98166c045dc587c0",
          ],
        },
      })
        .populate("status")
        .populate("driver")
        .populate("restaurant");
      return res.status(OK).send({ data: data });
    } catch (err) {
      return res.status(OK).send({});
    }
  },

  getDriverOrderByEmail: async (req, res) => {
    try {
      const { email } = req.body;
      const data = await Order.find({
        driverEmail: email,
        status: "6622d363c540830c9d300f7c",
      })
        .populate("status")
        .populate("driver")
        .populate("restaurant");

      return res.status(OK).send({ data: data });
    } catch (err) {
      console.log(err);
      return res.status(SERVER_ERROR).send({});
    }
  },

  getOrderById: async (req, res) => {
    try {
      const { id } = req.body;
      const data = await Order.findById(id)
        .populate("status")
        .populate("restaurant");

      return res.status(OK).send({ status: data.status.name });
    } catch (err) {
      console.log(err);
      return res.status(SERVER_ERROR).send({});
    }
  },
  delete: async (req, res) => {
    try {
      const id = req.params.id;
      const data = await Order.findByIdAndDelete(id);
      return res.status(OK).send({ error: false });
    } catch (err) {
      return res.status(SERVER_ERROR).send({ error: true, message: err });
    }
  },
  assign: async (req, res) => {
    try {
      const { driverId, id } = req.body;
      const status = await Status.findOne({ name: "Assigned" });
      const findDriver = await Driver.findById(driverId);

      const options = { new: true };

      const result = await Order.findByIdAndUpdate(
        id,
        { status: status._id, driver: driverId, driverEmail: findDriver.email },
        options
      );

      return res.status(OK).send({ error: false, result });
    } catch (err) {
      console.log(err);
      return res.status(SERVER_ERROR).send({ error: true, message: err });
    }
  },

  reAssign: async (req, res) => {
    try {
      const id = req.params.id;

      const { driver } = req.body;
      const status = await Status.findOne({ name: "Assigned" });
      const findDriver = await Driver.findById(driver);
      console.log(status);
      const options = { new: true };

      const result = await Order.findByIdAndUpdate(
        id,
        { status: status._id, driver, driverEmail: findDriver.email },
        options
      );

      return res.status(OK).send({ error: false, result });
    } catch (err) {
      console.log(err);
      return res.status(SERVER_ERROR).send({ error: true, message: err });
    }
  },

  changeOrderStatus: async (req, res) => {
    try {
      const { orderId, statusName } = req.body;

      const status = await Status.findOne({ name: statusName });

      const options = { new: true };

      const result = await Order.findByIdAndUpdate(
        orderId,
        { status: status._id },
        options
      );

      return res.status(OK).send({ error: false, result });
    } catch (err) {
      console.log(err);
      return res.status(SERVER_ERROR).send({ error: true, message: err });
    }
  },

  accept: async (req, res) => {
    try {
      const id = req.body.orderId;
      const status = await Status.findOne({ name: "Accepted" });
      const options = { new: true };
      const result = await Order.findByIdAndUpdate(
        id,
        { status: status._id },
        options
      );

      return res.status(OK).send({ error: false, result });
    } catch (err) {
      console.log(err);
      return res.status(SERVER_ERROR).send({ error: true, message: err });
    }
  },
  reject: async (req, res) => {
    try {
      const id = req.body.orderId;
      const status = await Status.findOne({ name: "Rejected" });
      const options = { new: true };
      const result = await Order.findByIdAndUpdate(
        id,
        { status: status._id },
        options
      );

      return res.status(OK).send({ error: false, result });
    } catch (err) {
      console.log(err);
      return res.status(SERVER_ERROR).send({ error: true, message: err });
    }
  },

  cancelDriver: async (req, res) => {
    try {
      const id = req.body.orderId;

      const status = await Status.findOne({ name: "Pending" });
      console.log(status);
      const options = { new: true };

      const result = await Order.findByIdAndUpdate(
        id,
        { status: status._id, driver: null, driverEmail: null },
        options
      );

      return res.status(OK).send({ error: false, result });
    } catch (err) {
      console.log(err);
      return res.status(SERVER_ERROR).send({ error: true, message: err });
    }
  },
  update: async (req, res) => {
    try {
      const id = req.params.id;

      const body = req.body;

      const options = { new: true };

      const result = await Order.findByIdAndUpdate(id, body, options);

      return res.status(OK).send({ error: false, result });
    } catch (err) {
      return res.status(SERVER_ERROR).send({ error: true, message: err });
    }
  },
};
