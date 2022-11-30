const authMiddleware = require("./auth-middleware");
const errorHandlerMiddleware = require("./error-handler-middleware");
const notFoundMiddleware = require("./not-found-middleware");
const routeAccessAllowedFor = require("./protectedRoutes");

module.exports = {
  authMiddleware,
  errorHandlerMiddleware,
  notFoundMiddleware,
  routeAccessAllowedFor,
};
