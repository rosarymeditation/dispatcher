const controller = require("../controllers/restaurant");
const { rootUrl } = require("../utility/constants");
const { auth, upload } = require("../utility/global");
module.exports = (app) => {
  app.post(rootUrl("restaurant/create"), controller.create);
  app.get(rootUrl("restaurant/:id"), controller.findId);
  app.post(rootUrl("restaurant/list"), controller.findAll);
  app.delete(rootUrl("restaurant/:id"), controller.delete);
  app.patch(rootUrl("restaurant/:id"), controller.update);
};
