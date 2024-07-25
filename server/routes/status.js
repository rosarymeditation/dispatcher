const controller = require("../controllers/status");
const { rootUrl } = require("../utility/constants");
module.exports = (app) => {
  app.post(rootUrl("status"), controller.create);
};
