const Driver = require("../models/driver");
const { upload, CapitalizeFirstLetter } = require("../utility/global");
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const { SERVER_ERROR, OK } = require("../errors/statusCode");
const jwt = require("jsonwebtoken");
// const query = new Query(PostCode);
const secret = process.env.SECRET;
const bcrypt = require("bcryptjs");
const { email1, email2 } = require("../utility/constants");
const Role = require("../models/role");
module.exports = {
  create: async (req, res) => {
    try {
      //const userId = req.userData.id;
      const { firstName, lastName, password, email, phone } = req.body;
      const findEmail = await Driver.findOne({ email });
      const findPhone = await Driver.findOne({ phone });

      if (findEmail) {
        return res
          .status(SERVER_ERROR)
          .send({ message: "Email already exist", error: true });
      }
      if (findPhone) {
        return res
          .status(SERVER_ERROR)
          .send({ message: "Phone number already exist", error: true });
      }
      //
      // const userAddress = await Address.find({ user: userId });
      // const data = Driver(body);
      // await data.save();
      // return res.status(OK).send({ error: false });
      bcrypt.hash(password, 10, async (err, hash) => {
        if (err) {
          return res
            .status(SERVER_ERROR)
            .send({ message: "Error", error: true });
        } else {
          const dataObj = new Driver({
            password: hash,
            firstName: CapitalizeFirstLetter(firstName),
            lastName: CapitalizeFirstLetter(lastName),
            email: email,
            phone,
          });
          try {
            const data = await dataObj.save();
            const token = jwt.sign(
              {
                id: data._id,
                email: email,
                firstname: firstName,
                lastname: lastName,
              },
              secret,
              {
                expiresIn: "7000d",
              }
            );
            return res.status(OK).send({
              error: false,
              token: token,
              userId: data.id,
            });
          } catch (err) {
            console.log(err);
            return res.status(SERVER_ERROR).send({
              error: true,
              message: err,
            });
          }
        }
      });
    } catch (err) {
      console.log(err);
      return res.status(SERVER_ERROR).send({ error: true });
    }
  },
  findId: async (req, res) => {
    try {
      const id = req.params.id;
      const data = await Driver.findById(id);
      return res.status(OK).send({ data: data });
    } catch (err) {
      return res.status(OK).send({});
    }
  },
  findAll: async (req, res) => {
    try {
      const id = req.params.id;
      const data = await Driver.find({ isOnline: true });
      return res.status(OK).send({ data: data });
    } catch (err) {
      return res.status(OK).send({});
    }
  },

  findByEmail: async (req, res) => {
    try {
      const email = req.body.email;
      const data = await Driver.findOne({ email });
      return res.status(OK).send(data);
    } catch (err) {
      return res.status(SERVER_ERROR).send({});
    }
  },

  findOnline: async (req, res) => {
    try {
      const data = await Driver.find({ isOnline: true });
      return res.status(OK).send({ data: data });
    } catch (err) {
      return res.status(OK).send({});
    }
  },
  delete: async (req, res) => {
    try {
      const id = req.params.id;
      const data = await Driver.findByIdAndDelete(id);
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

      const result = await Driver.findByIdAndUpdate(id, body, options);

      return res.status(OK).send({ error: false, result });
    } catch (err) {
      return res.status(SERVER_ERROR).send({ error: true, message: err });
    }
  },
  toggleOnline: async (req, res) => {
    try {
      const { email, isOnline } = req.body;
      const driver = await Driver.findOne({ email });
      const body = { isOnline: isOnline };

      const options = { new: true };

      const result = await Driver.findByIdAndUpdate(driver._id, body, options);

      return res.status(OK).send({ error: false, result });
    } catch (err) {
      return res.status(SERVER_ERROR).send({ error: true, message: err });
    }
  },

  updatePosition: async (req, res) => {
    try {
      const { email, lon, lat } = req.body;

      const body = { lon: lon, lat: lat };
      const driver = await Driver.findOne({ email });

      const options = { new: true };

      const result = await Driver.findByIdAndUpdate(driver._id, body, options);

      return res.status(OK).send({ error: false, result });
    } catch (err) {
      return res.status(SERVER_ERROR).send({ error: true, message: err });
    }
  },

  userData: async (req, res) => {
    try {
      return res
        .status(OK)
        .send({ name: "Nnamdi", email: "nnamdi4nwosu@gmail.com", age: "59" });
    } catch (err) {
      return res.status(SERVER_ERROR).send({ error: true, message: err });
    }
  },
};
