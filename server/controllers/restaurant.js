const Restaurant = require("../models/restaurant");
const { upload, generateRandomNumbers } = require("../utility/global");

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
      const { name, email, phone, address, postCode, lon, lat, display } =
        req.body;
      const findEmail = await Restaurant.findOne({ email });
      const findPhone = await Restaurant.findOne({ phone });
      if (findEmail && findEmail.postCode && postCode) {
        return res
          .status(SERVER_ERROR)
          .send({ message: "Email already exist", error: true });
      }
      if (findPhone && findEmail.postCode && postCode) {
        return res
          .status(SERVER_ERROR)
          .send({ message: "Phone number already exist", error: true });
      }
      const data = Restaurant({
        refNo: generateRandomNumbers(),
        name,
        email,
        address,
        postCode,
        phone,
        lon,
        lat,
        display,
      });
      await data.save();
      return res.status(OK).send({ error: false });
    } catch (err) {
      console.log(err);
      return res.status(SERVER_ERROR).send({ error: true });
    }
  },
  findId: async (req, res) => {
    try {
      const id = req.params.id;
      const data = await Restaurant.findById(id);
      return res.status(OK).send({ data: data });
    } catch (err) {
      return res.status(OK).send({});
    }
  },
  findAll: async (req, res) => {
    try {
      const data = await Restaurant.find();
      return res.status(OK).send({ data: data });
    } catch (err) {
      return res.status(OK).send({});
    }
  },
  delete: async (req, res) => {
    try {
      const id = req.params.id;
      const data = await Restaurant.findByIdAndDelete(id);
      return res.status(OK).send({ error: false });
    } catch (err) {
      return res.status(SERVER_ERROR).send({ error: true, message: err });
    }
  },

  update: async (req, res) => {
    try {
      const id = req.params.id;

      const body = req.body;
      //body.refNo = generateRandomNumbers();
      const options = { new: true };

      const result = await Restaurant.findByIdAndUpdate(id, body, options);

      return res.status(OK).send({ error: false, result });
    } catch (err) {
      console.log(err);
      return res.status(SERVER_ERROR).send({ error: true, message: err });
    }
  },
};
