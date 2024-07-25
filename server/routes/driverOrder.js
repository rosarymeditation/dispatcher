const controller = require("../controllers/driverOrder");
const { rootUrl } = require("../utility/constants");
const { auth, upload } = require("../utility/global");
module.exports = (app) => {
  app.post(rootUrl("driverOrder/create"), controller.create);
  app.delete(rootUrl("driverOrder/:id"), controller.delete);
  app.patch(rootUrl("driverOrder/:id"), controller.update);
};
