const controller = require("../controllers/order");
const { rootUrl } = require("../utility/constants");
const { auth, upload } = require("../utility/global");
module.exports = (app) => {
  app.post(rootUrl("order/create"), controller.create);
  //app.get(rootUrl("order/:id"), controller.findId);
  //getDriverOrderByEmail
  app.post(rootUrl("order/ByDriverEmail"), controller.getDriverOrderByEmail);
  app.post(rootUrl("order/list"), controller.findAll);
  app.post(rootUrl("order/finish/list"), controller.findAllFinished);
  app.post(rootUrl("accepted"), controller.accept);
  app.post(rootUrl("rejected"), controller.reject);
  app.post(rootUrl("orderById"), controller.getOrderById);
  app.post(rootUrl("changeOrderStatus"), controller.changeOrderStatus);
  app.post(rootUrl("order/assign"), controller.assign);
  app.post(rootUrl("order/cancel"), controller.cancelDriver);
  app.patch(rootUrl("order/reAssign/:id"), controller.reAssign);
  app.delete(rootUrl("order/:id"), controller.delete);
  app.patch(rootUrl("order/:id"), controller.update);
  app.post(
    rootUrl("getAllOrderForDriverByEmail"),
    controller.getAllOrderForDriverByEmail
  );
  //getAllOrderForDriverByEmail
};
