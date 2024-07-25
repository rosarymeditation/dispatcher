const controller = require("../controllers/driverStatus");
const { rootUrl } = require("../utility/constants");
module.exports = (app) => {
  app.post(rootUrl("driverStatus"), controller.create);
};
