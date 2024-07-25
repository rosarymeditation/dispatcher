const controller = require("../controllers/driver");
const { rootUrl } = require("../utility/constants");
const { auth, upload } = require("../utility/global");
module.exports = (app) => {
  app.post(rootUrl("driver/create"), controller.create);
  app.get(rootUrl("driver/:id"), controller.findId);
  app.post(rootUrl("driver/list"), controller.findAll);
  app.post(rootUrl("findDriverOnline"), controller.findOnline);
  app.get(rootUrl("user-data"), controller.userData);
  app.delete(rootUrl("driver/:id"), controller.delete);
  app.patch(rootUrl("driver/:id"), controller.update);
};
